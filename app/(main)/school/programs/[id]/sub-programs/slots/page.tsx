"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
  ChevronLeft,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getCProgramSlots, getSubprogram } from "@/app/helpers/program";
import { getSubjects, getTeachers } from "@/app/helpers/lookups";
import { SlotCell } from "./components/SlotCell";
import { InviteModal } from "./components/modals/InviteModal";
import { ActiveSlotModal } from "./components/modals/ActiveSlotModal";
import { Stat } from "./components/Stat";
import { INITIAL_SLOTS, TEACHERS, SUBJECTS, teacherById, simulateResponse, avatarColor } from "./constants";
import { Toast } from "@/app/components/ui/toasts/Toast";
import { CreateTeacherModal } from "./components/modals/CreateTeacherModal";
import ScrollTable from "./components/ScrollTable";
import { useSubProgramStore } from "@/app/store/useSubProgramStore";

/* ─────────────────────────────────────────────────────── */
/* WEEK NAV HELPERS                                         */
/* ─────────────────────────────────────────────────────── */

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS    = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** Returns the Monday of the week containing `date` */
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Build the 7-day DAYS array for the table header */
function buildDays(weekStart) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return DAY_NAMES.map((name, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return {
      day: name,
      date: d.getDate(),
      active: d.getTime() === today.getTime(),
      fullDate: d,
    };
  });
}

/** "28 Apr 2025 – 4 May 2025" label */
function weekLabel(weekStart) {
  const end = new Date(weekStart);
  end.setDate(weekStart.getDate() + 6);
  const fmt = (d) =>
    d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  return `${fmt(weekStart)} – ${fmt(end)}`;
}

/** "Jan" | "Feb" … from a Date */
function monthFromDate(d) {
  return d.toLocaleDateString("en-GB", { month: "short" });
}

/** Returns true if ANY time-row has a real slot (non-null slotDate) for this day */
function dayHasRealSlots(slots, day) {
  return Object.values(slots).some(
    (dayMap) => dayMap?.[day]?.slotDate != null
  );
}

/**
 * Scans all slotDate values in the API response and returns:
 * { minDate: Date, maxDate: Date } — the earliest and latest real slot dates.
 * Returns null if no real slots found.
 */
function deriveProgramRange(slots) {
  const dates = [];
  Object.values(slots).forEach((dayMap) => {
    Object.values(dayMap).forEach((slot) => {
      if (slot?.slotDate) dates.push(new Date(slot.slotDate));
    });
  });
  if (dates.length === 0) return null;
  dates.sort((a, b) => a - b);
  return { minDate: dates[0], maxDate: dates[dates.length - 1] };
}

/**
 * Given a program range, returns a Set of month strings (e.g. "Jan", "May")
 * that fall within the range — inclusive of both end months.
 */
function enabledMonths(programRange) {
  if (!programRange) return new Set(MONTHS); // no range yet → all enabled
  const { minDate, maxDate } = programRange;
  const enabled = new Set();
  const cursor = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const end    = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  while (cursor <= end) {
    enabled.add(MONTHS[cursor.getMonth()]);
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return enabled;
}

/* ─────────────────────────────────────────────────────── */

export const SIDEBAR = [
  { name: "Allocate Slots", icon: <CalendarDays size={18} />, link: "/school/programs" },
  { name: "Timetable",      icon: <Clock size={18} />,        link: (id) => `/school/programs/${id}/sub-programs/timetable` },
  { name: "Tutors",         icon: <Users size={18} />,        link: "/school/curriculum" },
  { name: "Students",       icon: <GraduationCap size={18} />,link: "/school/curriculum" },
  { name: "Resources",      icon: <Layers size={18} />,       link: "/school/resources" },
  { name: "Partners",       icon: <Handshake size={18} />,    link: "/school/partners" },
];

export function Avatar({ initials, size = "md" }) {
  const dim =
    size === "lg" ? "w-12 h-12 text-[16px]" :
    size === "sm" ? "w-6 h-6 text-[10px]"   :
                    "w-9 h-9 text-[13px]";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ background: avatarColor(initials) }}
    >
      {initials}
    </div>
  );
}

export function StatusPill({ status }) {
  if (status === "accepted")
    return (
      <span className="text-[10px] font-bold text-[#027A48] bg-[#ECFDF3] border border-[#6CE9A6] px-2 py-0.5 rounded-full flex items-center gap-1">
        <CheckCircle2 size={10} />Accepted
      </span>
    );
  if (status === "declined")
    return (
      <span className="text-[10px] font-bold text-[#9A3412] bg-[#FFF1F1] border border-[#FECACA] px-2 py-0.5 rounded-full flex items-center gap-1">
        <XCircle size={10} />Declined
      </span>
    );
  return (
    <span className="text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full flex items-center gap-1">
      <Clock3 size={10} />Pending
    </span>
  );
}

/* ─────────────────────────────────────────────────────── */
/* MAIN                                                     */
/* ─────────────────────────────────────────────────────── */
export default function AllocateSlots() {
  const [activeTab, setActiveTab]                   = useState("Allocate Slots");
  const [slots, setSlots]                           = useState(INITIAL_SLOTS);
  const [selectedSlots, setSelectedSlots]           = useState([]);
  const [inviteModal, setInviteModal]               = useState(false);
  const [activeSlotModal, setActiveSlotModal]       = useState(null);
  const [toasts, setToasts]                         = useState([]);
  const [teachers, setTeachers]                     = useState(TEACHERS);
  const [subjects, setSubjects]                     = useState(SUBJECTS);
  const [loading, setLoading]                       = useState(false);
  const [createTeacherModal, setCreateTeacherModal] = useState(false);
  const [newTeacherData, setNewTeacherData]         = useState(null);
  const [subprogram,setSubprogram] = useState(null);

  // ── Program date range — derived from first API response, never changes after ──
  const [programRange, setProgramRange] = useState(null); // { minDate, maxDate }

  // Single source of truth for the displayed week
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date()));

  // All derived from weekStart
  const days         = buildDays(weekStart);
  const activeMonth  = monthFromDate(weekStart);
  const displayLabel = weekLabel(weekStart);

  const timers = useRef({});
  const { id } = useParams();
  const router = useRouter();
  const { setActiveSubProgram } = useSubProgramStore();
  const curriculumId = 1;

  // ── Derived range constraints ──
  const validMonths = enabledMonths(programRange); // Set<string>

  // The Monday of the week containing minDate / maxDate
  const minWeekStart = programRange ? getWeekStart(programRange.minDate) : null;
  const maxWeekStart = programRange ? getWeekStart(programRange.maxDate) : null;

  // Can we go prev/next?
  const canGoPrev = !minWeekStart || weekStart > minWeekStart;
  const canGoNext = !maxWeekStart || weekStart < maxWeekStart;

  /* ── Fetch slots for a given week ── */
  const fetchSlots = useCallback(async (programId, weekStartDate, isFirstLoad = false) => {
    setLoading(true);
    setSelectedSlots([]);
    try {
      const weekEnd = new Date(weekStartDate);
      weekEnd.setDate(weekStartDate.getDate() + 6);

      const result = await getCProgramSlots(programId, programId, {
        fromDate: weekStartDate.toISOString().split("T")[0],
        toDate:   weekEnd.toISOString().split("T")[0],
      });

      const data = result?.data ?? {};
      setSlots(data);

      // ── On the very first load, derive and lock in the program range ──
      if (isFirstLoad) {
        const range = deriveProgramRange(data);
        if (range) {
          setProgramRange(range);
          // If current weekStart is outside range, snap to the first valid week
          const firstValidWeek = getWeekStart(range.minDate);
          setWeekStart(firstValidWeek);
        }
      }
    } catch (err) {
      console.error("Failed to fetch slots:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load — pass isFirstLoad=true so we derive the range
  useEffect(() => {
    if (!id) return;
    setActiveSubProgram({ id });

    getSubprogram({ subProgramId:id }).then((resp)=>setSubprogram(resp.data)).catch(console.error);
    fetchSlots(id, weekStart, true);
    getTeachers({ curriculumId }).then(setTeachers).catch(console.error);
    getSubjects({ curriculumId }).then(setSubjects).catch(console.error);
  }, [id]); // ← only on mount / id change

  // Subsequent week changes — normal fetch, no range re-derivation
  useEffect(() => {
    if (!id || !programRange) return; // skip until range is known
    fetchSlots(id, weekStart, false);
  }, [weekStart]); // ← fires whenever week changes (but not on first mount — programRange is null then)

  /* ── Week navigation — guarded by range ── */
  function goToPrevWeek() {
    if (!canGoPrev) return;
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  }

  function goToNextWeek() {
    if (!canGoNext) return;
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  }

  // Jump to first Monday of a clicked month — only if month is enabled
  function handleMonth(monthStr) {
    if (!validMonths.has(monthStr)) return;
    const monthIndex = MONTHS.indexOf(monthStr);
    if (monthIndex === -1) return;
    const year = programRange
      ? programRange.minDate.getFullYear()  // use program year, not local year
      : weekStart.getFullYear();
    const firstOfMonth = new Date(year, monthIndex, 1);
    const targetWeek   = getWeekStart(firstOfMonth);

    // Clamp to valid range
    const clamped = minWeekStart && targetWeek < minWeekStart ? minWeekStart
                  : maxWeekStart && targetWeek > maxWeekStart ? maxWeekStart
                  : targetWeek;
    setWeekStart(new Date(clamped));
  }

  /* ── Toast helper ── */
  function addToast(message, type = "info") {
    const tid = Date.now() + Math.random();
    setToasts(p => [...p, { id: tid, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== tid)), 4000);
  }

  /* ── Slot selection ── */
  function toggleSlotSelect(time, day, index, slot) {
    setSelectedSlots(prev => {
      const exists = prev.find(s => s.time === time && s.day === day);
      if (exists) return prev.filter(s => !(s.time === time && s.day === day));
      return [...prev, { time, day, slotId: slot?.id }];
    });
  }

  function isSelected(time, day) {
    return selectedSlots.some(s => s.time === time && s.day === day);
  }

  /* ── Invite handler ── */
  async function handleInvite(eligibleSlots, teacherIds, subject) {
    setSlots(prev => {
      let next = { ...prev };
      eligibleSlots.forEach(({ time, day }) => {
        const slot = prev[time]?.[day];
        if (!slot || slot.type === "active") return;
        const existing  = slot.invites || [];
        const newInvites = teacherIds.map(tid => ({ teacherId: tid, status: "pending" }));
        next = {
          ...next,
          [time]: {
            ...next[time],
            [day]: { type: "pending", subject, invites: [...existing, ...newInvites] },
          },
        };
      });
      return next;
    });

    const validSlots      = eligibleSlots.filter(s => s.slotId);
    const selectedTeachers = teachers.filter(t => teacherIds.includes(t.id));
    const payload = {
      subjectId:  subject?.id,
      teacherIds: selectedTeachers.filter(t => !t.isNew).map(t => t.id),
      teachers:   selectedTeachers.filter(t => t.isNew),
      slots:      validSlots.map(s => ({ slotId: s.slotId })),
    };

    try {
      const res  = await fetch("/api/invitations/invite", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      addToast(
        `${teacherIds.length} teacher${teacherIds.length !== 1 ? "s" : ""} invited to ${eligibleSlots.length} slots`,
        "info"
      );
    } catch (err) {
      console.error("Error sending invite:", err);
    }
  }

  const eligibleCount = selectedSlots.filter(
    ({ time, day }) => slots[time]?.[day]?.type !== "active"
  ).length;

  // Pre-compute which days have real slot data — once per render, not per cell
  const dayEnabled = Object.fromEntries(
    DAY_NAMES.map(name => [name, dayHasRealSlots(slots, name)])
  );

  console.log(subprogram)
  /* ────────────────────────────────────────────────────── */
  /* RENDER                                                  */
  /* ────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#EBEBED] p-8 font-sans text-[#1E293B]">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] mb-5 text-[#64748B]">
        <BookOpen size={14} />
        <span className="hover:underline cursor-pointer">Programs</span>
        <ChevronRight size={12} className="text-[#94A3B8]" />
        <span className="text-[#3B9EFF] font-semibold">{subprogram?.programName}</span>
      </nav>

      {/* Page header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight">{subprogram?.name}</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-[14px] font-semibold text-[#475569] shadow-sm hover:bg-gray-50 transition">
            Other Actions <ChevronDown size={16} />
          </button>
          {/* <button className="flex items-center gap-2 px-6 py-2.5 bg-[#3B9EFF] text-white rounded-full text-[14px] font-semibold shadow-md hover:bg-[#328dec] transition">
            <Plus size={18} /> Add
          </button> */}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center bg-white/80 backdrop-blur-sm border border-[#E2E8F0] rounded-[20px] mb-10 shadow-sm">
        <Stat label={subprogram?.name} sub={`Date Created: ${subprogram?.startDate}`} />
        <Stat label={subprogram?.startDate} sub="Program Start Date" />
        <Stat label={subprogram?.endDate} sub="Program End Date" />
        <Stat label={subprogram?.curriculumName}  sub="Curriculum" icon={<div className="bg-[#1E293B] text-white text-[9px] px-1 py-0.5 rounded mr-2 font-bold">{subprogram?.curriculumName} </div>} />
        <Stat label={subprogram?.educationLevelName}  sub="Grade" />
        <div className="px-6 py-4 border-r border-[#F1F5F9]">
          <p className="text-[11px] font-medium text-[#94A3B8] uppercase mb-1">Subjects</p>
          <div className="flex items-center gap-1.5">
          {subprogram?.subjects?.slice(0, 2).map((subject) => (
            <span
              key={subject?.id || subject?.subjectName}
              className="px-2 py-0.5 bg-[#F4F3FF] text-[#5925DC] border border-[#D9D6FE] rounded text-[11px] font-bold"
            >
              {subject?.subjectName}
            </span>
          ))}

          {subprogram?.subjects?.length > 2 && (
            <span className="text-[11px] text-[#64748B] font-bold">
              +{subprogram.subjects.length - 2}
            </span>
          )}
          </div>
        </div>
        <div className="px-6 py-4">
          <p className="text-[11px] font-medium text-[#94A3B8] uppercase mb-1">Status</p>
          <span className="px-3 py-1 bg-[#ECFDF3] text-[#027A48] rounded-full text-[11px] font-bold">Active</span>
        </div>
      </div>

      <div className="flex gap-10">

        {/* Sidebar */}
        <div className="w-[200px] flex flex-col gap-2">
          {SIDEBAR.map(item => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                router.push(typeof item.link === "function" ? item.link(id) : item.link);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all
                ${activeTab === item.name
                  ? "bg-[#3B9EFF] text-white shadow-lg shadow-blue-200"
                  : "text-[#94A3B8] hover:bg-white hover:text-[#475569]"}`}
            >
              {item.icon}{item.name}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Allocate Slots</h2>
            <p className="text-[14px] text-[#64748B]">Select one or more free/pending slots, then invite teachers. First to accept wins.</p>
          </div>

          {/* Week navigation + month picker */}
          <div className="flex items-center justify-between mb-5">

            {/* Prev / label / Next */}
            <div className="flex items-center gap-3">
              <button
                onClick={goToPrevWeek}
                disabled={!canGoPrev}
                className="p-1.5 rounded-lg border border-transparent transition text-[#64748B]
                  enabled:hover:bg-white enabled:hover:border-[#E2E8F0]
                  disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-[15px] font-bold text-[#0F172A]">{displayLabel}</span>
              <button
                onClick={goToNextWeek}
                disabled={!canGoNext}
                className="p-1.5 rounded-lg border border-transparent transition text-[#64748B]
                  enabled:hover:bg-white enabled:hover:border-[#E2E8F0]
                  disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Month picker */}
            <div className="flex items-center bg-white border border-[#E2E8F0] rounded-xl p-1 shadow-sm">
              <button className="px-3 py-1.5 flex items-center gap-1 text-[13px] font-bold border-r border-[#F1F5F9]">
                {weekStart.getFullYear()} <ChevronDown size={14} />
              </button>
              <div className="flex px-1">
                {MONTHS.map(m => {
                  const isActive   = m === activeMonth;
                  const isDisabled = !validMonths.has(m);
                  return (
                    <button
                      key={m}
                      onClick={() => handleMonth(m)}
                      disabled={isDisabled}
                      className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition
                        ${isActive
                          ? "bg-[#D1E9FF] text-[#004EEB]"
                          : isDisabled
                            ? "text-[#CBD5E1] cursor-not-allowed"
                            : "text-[#94A3B8] hover:text-[#475569]"}`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-4">
            {[
              { cls: "border-dashed border-[#CBD5E1]", label: "Free — click to select" },
              { cls: "bg-[#FFFBEB] border-[#FDE68A]",  label: "Pending — click to select" },
              { cls: "bg-[#D1FADF] border-[#6CE9A6]",  label: "Confirmed — click to view" },
            ].map(({ cls, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 ${cls}`} />
                <span className="text-[12px] font-medium text-[#64748B]">{label}</span>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className={`mb-4 flex items-center justify-between px-5 py-3 rounded-2xl border-2 transition-all duration-200
            ${selectedSlots.length > 0 ? "bg-[#EFF6FF] border-[#BFDBFE]" : "bg-[#F8FAFC] border-[#E2E8F0]"}`}>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-[#0F172A]">
                {selectedSlots.length > 0
                  ? `${selectedSlots.length} slot${selectedSlots.length !== 1 ? "s" : ""} selected`
                  : "No slots selected"}
              </span>
              {selectedSlots.length > 0 && eligibleCount < selectedSlots.length && (
                <span className="text-[11px] text-[#B45309] font-medium">
                  · {selectedSlots.length - eligibleCount} filled will be skipped
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedSlots.length > 0 && (
                <button
                  onClick={() => setSelectedSlots([])}
                  className="px-3 py-1.5 text-[12px] font-bold text-[#64748B] hover:text-[#0F172A] transition"
                >
                  Clear
                </button>
              )}
              <button
                disabled={eligibleCount === 0}
                onClick={() => setInviteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#3B9EFF] text-white rounded-xl text-[13px] font-bold hover:bg-[#328dec] transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-100 disabled:shadow-none"
              >
                <Send size={13} />
                {eligibleCount > 0
                  ? `Invite to ${eligibleCount} Slot${eligibleCount !== 1 ? "s" : ""}`
                  : "Select slots to invite"}
              </button>
            </div>
          </div>

          {/* Timetable */}
          <div className="relative">

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-[24px]">
                <div className="w-7 h-7 border-4 border-[#3B9EFF] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="bg-[#F8FAFC]/50 border border-[#CBD5E1] rounded-[24px] overflow-hidden">
              <table className="w-full border-collapse">

                {/* ── Header ── */}
                <thead>
                  <tr className="border-b border-[#CBD5E1]">
                    <th className="w-32 p-6 text-left text-[15px] font-bold text-[#0F172A] border-r border-[#CBD5E1]">
                      Time
                    </th>
                    {days.map(d => {
                      const enabled = dayEnabled[d.day];
                      return (
                        <th
                          key={d.day}
                          className={`p-4 transition-all duration-200
                            ${!enabled ? "opacity-30 blur-[1.5px]" : ""}`}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-tighter mb-1">
                              {d.day}
                            </span>
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-bold
                              ${d.active ? "bg-[#3B9EFF] text-white shadow-md" : "text-[#0F172A]"}`}>
                              {d.date}
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* ── Body ── */}
                <tbody>
                  {Object.entries(slots).map(([time, dayMap], i) => (
                    <tr key={i}>
                      <td className="p-6 text-[14px] font-bold text-[#0F172A] border-r border-b border-[#CBD5E1] bg-[#F1F5F9]/30 whitespace-nowrap">
                        {time}
                      </td>
                      {days.map(({ day }) => {
                      const slot    = dayMap?.[day];
                      const enabled = dayEnabled[day];

                      // ✅ allow timetable-generated cells
                      const hasSlot =
                        slot &&
                        (
                          slot.type === "free" ||
                          slot.type === "break" ||
                          slot.type === "holiday" ||
                          slot.id != null
                        );

                        return (
                          <td
                            key={day}
                            className={`p-3 border-b border-[#CBD5E1] transition-all duration-200
                              ${!enabled || !hasSlot
                                ? "opacity-30 blur-[1.5px] pointer-events-none select-none"
                                : ""}`}
                          >
                            <SlotCell
                              teachers={teachers}
                              slot={slot}
                              isSelected={isSelected(time, day)}
                              onToggle={() => toggleSlotSelect(time, day, i, slot)}
                              onOpenActive={() => setActiveSlotModal({ time, day, slot })}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {inviteModal && (
        <InviteModal
          selectedSlots={selectedSlots}
          allSlots={slots}
          subjects={subjects}
          teachers={teachers}
          onClose={() => { setInviteModal(false); setSelectedSlots([]); }}
          onInvite={handleInvite}
          onCreateTeacher={({ name, subject }) => {
            setNewTeacherData({ name, subject });
            setCreateTeacherModal(true);
          }}
        />
      )}

      {createTeacherModal && (
        <CreateTeacherModal
          open={createTeacherModal}
          defaultData={newTeacherData}
          onClose={() => setCreateTeacherModal(false)}
          onSave={(data) => {
            const newTeacher = {
              id: Date.now(),
              isNew: true,
              fullName: data.name,
              phone: data.phone,
              email: data.email,
              available: true,
              averageRating: 0,
              enrollments: [{ subjects: [newTeacherData?.subject] }],
            };
            setTeachers(prev => [newTeacher, ...prev]);
            setCreateTeacherModal(false);
          }}
        />
      )}

      {activeSlotModal && (
        <ActiveSlotModal
          slot={activeSlotModal.slot}
          time={activeSlotModal.time}
          day={activeSlotModal.day}
          onClose={() => setActiveSlotModal(null)}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}