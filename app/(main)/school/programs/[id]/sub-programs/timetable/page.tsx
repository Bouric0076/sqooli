"use client";
import { useState, useEffect, useRef } from "react";
import { DesktopView } from "./components/DesktopView";
import { EditModal } from "./components/EditModal";
import { MobileView } from "./components/mobileView";
import { getSlotTimetable } from "@/app/helpers/program";

// ─── Data ─────────────────────────────────────────────────────────────────────

export const DAYS = [
  { key: "mon", label: "MON", color: "#e85d5d", light: "#fef0f0" },
  { key: "tue", label: "TUE", color: "#f5a623", light: "#fff8ee" },
  { key: "wed", label: "WED", color: "#2db89e", light: "#edfaf7" },
  { key: "thu", label: "THU", color: "#3b9ad9", light: "#eef6fd" },
  { key: "fri", label: "FRI", color: "#7e57c2", light: "#f4f0fb" },
  { key: "sat", label: "SAT", color: "#607d8b", light: "#f0f4f6" },
  { key: "sun", label: "SUN", color: "#c0344d", light: "#fef0f3" },
];

export const TIME_SLOTS = [
  { id: "slot1", label: "7:00 – 8:00 AM" },
  { id: "slot2", label: "8:00 – 9:30 AM" },
  { id: "TEA_BREAK", isBreak: true, label: "☕  Tea Break", style: "tea" },
  { id: "slot3", label: "10:00 – 11:30 AM" },
  { id: "slot4", label: "11:30 – 1:00 PM" },
  { id: "LUNCH_BREAK", isBreak: true, label: "🍽  Lunch Break", style: "lunch" },
  { id: "slot5", label: "1:30 – 3:00 NOON" },
  { id: "slot6", label: "3:00 – 4:30 PM" },
];

// Generate 4 weeks starting from a base date
export function getWeeks(baseDate = new Date("2026-01-05")) {
  return Array.from({ length: 4 }, (_, wi) => {
    const weekStart = new Date(baseDate);
    weekStart.setDate(baseDate.getDate() + wi * 7);
    return {
      id: `week${wi + 1}`,
      label: `Week ${wi + 1}`,
      days: DAYS.map((day, di) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + di);
        return {
          ...day,
          date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "/"),
        };
      }),
    };
  });
}

export const WEEKS = getWeeks();

function buildDefaultSchedule() {
  const schedule = {};
  WEEKS.forEach((week) => {
    week.days.forEach((day) => {
      TIME_SLOTS.filter((s) => !s.isBreak).forEach((slot) => {
        schedule[`${week.id}_${slot.id}_${day.key}`] = {
          subject: "Mathematics",
          topic: "Geometry",
          teacher: "Mr. Swift Code",
          lessonId: "Sqo0l768",
          joinUrl: "#",
        };
      });
    });
  });
  return schedule;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useIsMobile(bp = 768) {
  const [v, setV] = useState(() => typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const h = () => setV(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return v;
}

// ─── Week Navigator ───────────────────────────────────────────────────────────



// ─── Edit Modal ───────────────────────────────────────────────────────────────



// ─── Mobile: Day Tabs ─────────────────────────────────────────────────────────



// ─── Mobile View ──────────────────────────────────────────────────────────────



// ─── Desktop Class Card ───────────────────────────────────────────────────────



// ─── Desktop View ─────────────────────────────────────────────────────────────



// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Timetable() {
  const [schedule, setSchedule] = useState(buildDefaultSchedule);
  const [activeWeek, setActiveWeek] = useState("week1");
  const [editTarget, setEditTarget] = useState(null);
  const isMobile = useIsMobile(768);

  const handleEdit = (weekId, slotId, day, data) => {
    const week = WEEKS.find((w) => w.id === weekId);
    setEditTarget({ weekId, slotId, day, week, data });
  };

  const handleSave = (updatedData) => {
    const key = `${editTarget.weekId}_${editTarget.slotId}_${editTarget.day.key}`;
    setSchedule((prev) => ({ ...prev, [key]: updatedData }));
    setEditTarget(null);
  };


const loadTimetable = async () =>{

    //load from api helper
    const response = await getSlotTimetable();
}




  return (
    <>


      {isMobile
        ? <MobileView schedule={schedule} onEdit={handleEdit} activeWeek={activeWeek} onWeekChange={setActiveWeek} />
        : <DesktopView schedule={schedule} onEdit={handleEdit} activeWeek={activeWeek} onWeekChange={setActiveWeek} />
      }

      {editTarget && (
        <EditModal
          editTarget={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
          isMobile={isMobile}
        />
      )}
    </>
  );
}