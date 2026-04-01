"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getCProgramSlots } from "@/app/helpers/program";
import { getSubjects, getTeachers } from "@/app/helpers/lookups";
import { SlotCell } from "./components/SlotCell";
import { InviteModal } from "./components/modals/InviteModal";
import { ActiveSlotModal } from "./components/modals/ActiveSlotModal";

import { Stat } from "./components/Stat";
import { INITIAL_SLOTS, TEACHERS, SUBJECTS, teacherById, simulateResponse, DAYS, avatarColor } from "./constants";
import { Toast } from "@/app/components/ui/toasts/Toast";

/* ─────────────────────────────────────────────────────── */

export const SIDEBAR = [
  { name:"Allocate Slots", icon:<CalendarDays size={18}/> },
  { name:"Timetable",      icon:<Clock size={18}/>        },
  { name:"Tutors",         icon:<Users size={18}/>        },
  { name:"Students",       icon:<GraduationCap size={18}/> },
  { name:"Resources",      icon:<Layers size={18}/>       },
  { name:"Partners",       icon:<Handshake size={18}/>    },
];
/* ─────────────────────────────────────────────────────── */

 export function Avatar({initials, size="md"}){
  const dim = size==="lg"?"w-12 h-12 text-[16px]":size==="sm"?"w-6 h-6 text-[10px]":"w-9 h-9 text-[13px]";
  return (
    <div className={`${dim} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{background:avatarColor(initials)}}>{initials}</div>
  );
}

export function StatusPill({status}){
  if(status==="accepted") return <span className="text-[10px] font-bold text-[#027A48] bg-[#ECFDF3] border border-[#6CE9A6] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={10}/>Accepted</span>;
  if(status==="declined") return <span className="text-[10px] font-bold text-[#9A3412] bg-[#FFF1F1] border border-[#FECACA] px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle size={10}/>Declined</span>;
  return <span className="text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full flex items-center gap-1"><Clock3 size={10}/>Pending</span>;
}

/* ─────────────────────────────────────────────────────── */
/* MAIN                                                     */
/* ─────────────────────────────────────────────────────── */
export default function AllocateSlots(){
  const [activeTab, setActiveTab]         = useState("Allocate Slots");
  const [slots, setSlots]                 = useState(INITIAL_SLOTS);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [inviteModal, setInviteModal]     = useState(false);
  const [activeSlotModal, setActiveSlotModal] = useState(null);
  const [toasts, setToasts]               = useState([]);
  const[teachers, setTeachers]             = useState(TEACHERS);
  const [subjects, setSubjects]             = useState(SUBJECTS);
  const [loading,setLoading] = useState(false);
  const curriculumId = 1; // Assuming a fixed curriculum for this example
  

  const timers = useRef({});
   const { id } = useParams();

   console.log("Current subprogram ID from URL:", id);

  
  useEffect(() => {
    if(id){
      setLoading(true);
      getCProgramSlots(id, id).then(v=>setSlots(v?.data));
      getTeachers({curriculumId}).then(t=>setTeachers(t));
      getSubjects({curriculumId}).then(s=>setSubjects(s))
        .catch(console.error)
        .finally(()=>setLoading(false));
    }
  }, [id]);







  function addToast(message, type="info"){
    const id = Date.now()+Math.random();
    setToasts(p=>[...p,{id,message,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)), 4000);
  }

function toggleSlotSelect(time, day, index, slot) {
  setSelectedSlots(prev => {
    const exists = prev.find(s => s.time === time && s.day === day);

    if (exists) {
      return prev.filter(s => !(s.time === time && s.day === day));
    }

    return [
      ...prev,
      {
        time,
        day,
        slotId: slot?.id   // ✅ CRITICAL
      }
    ];
  });
}

  function isSelected(time, day){ return selectedSlots.some(s=>s.time===time && s.day===day); }



function getTeacherSubjects(t) {
  return t?.enrollments
    ?.flatMap(e => e.subjects)
    ?.map(s => s.name) // adjust if needed
    ?.join(", ") || "No subjects";
}

function getInitials(name) {
  return name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase())
    .join("") || "";
}




function applyAccept(prev, time, day, teacherId) {
  const slot = prev[time]?.[day];
  if (!slot || slot.type === "active") return prev;

  const invites = (slot.invites || []).map(i => ({
    ...i,
    status:
      i.teacherId === teacherId
        ? "accepted"
        : i.status === "pending"
        ? "declined"
        : i.status,
  }));

  const t = teacherById(teacherId, teachers);
  const subjects = getTeacherSubjects(t);

  return {
    ...prev,
    [time]: {
      ...prev[time],
      [day]: {
        type: "active",
        code:
          subjects.slice(0, 3).toUpperCase() +
          Math.floor(Math.random() * 900 + 100),
        subject: subjects,
        teacherName: t?.fullName,
        acceptedTeacherId: teacherId,
        avatarInitials: getInitials(t?.fullName),
        invites,
      },
    },
  };
}

function scheduleSimulatedResponse(time, day, teacherId) {
  const key = `${time}-${day}-${teacherId}`;
  clearTimeout(timers.current[key]);

  timers.current[key] = simulateResponse(() => {
    const willAccept = Math.random() < 0.6;

    setSlots(prev => {
      const slot = prev[time]?.[day];

      if (!slot || slot.type === "active") {
        const t = teacherById(teacherId, teachers);
        addToast(`${t?.fullName} responded but slot was already taken.`, "decline");
        return prev;
      }

      const invites = slot.invites || [];
      const alreadyAccepted = invites.some(i => i.status === "accepted");

      if (alreadyAccepted) {
        const t = teacherById(teacherId, teachers);
        addToast(`${t?.fullName} responded late — slot already filled.`, "decline");

        return {
          ...prev,
          [time]: {
            ...prev[time],
            [day]: {
              ...slot,
              invites: invites.map(i =>
                i.teacherId === teacherId
                  ? { ...i, status: "declined" }
                  : i
              ),
            },
          },
        };
      }

      const t = teacherById(teacherId, teachers);

      if (willAccept) {
        addToast(`${t?.fullName} accepted the slot!`, "accept");
        return applyAccept(prev, time, day, teacherId);
      } else {
        addToast(`${t?.fullName} declined.`, "decline");

        const updated = invites.map(i =>
          i.teacherId === teacherId
            ? { ...i, status: "declined" }
            : i
        );

        const allDone = updated.every(i => i.status !== "pending");
        const anyAccepted = updated.some(i => i.status === "accepted");

        if (allDone && !anyAccepted) {
          return {
            ...prev,
            [time]: {
              ...prev[time],
              [day]: { type: "free" },
            },
          };
        }

        return {
          ...prev,
          [time]: {
            ...prev[time],
            [day]: {
              ...slot,
              invites: updated,
            },
          },
        };
      }
    });
  });
}

async function handleInvite(eligibleSlots, teacherIds, subject) {

  // 1️⃣ Update UI state (your existing logic)
  setSlots(prev => {
    let next = { ...prev };

    eligibleSlots.forEach(({ time, day }) => {
      const slot = prev[time]?.[day];
      if (!slot || slot.type === "active") return;

      const existing = slot.invites || [];
      const newInvites = teacherIds.map(id => ({
        teacherId: id,
        status: "pending"
      }));

      next = {
        ...next,
        [time]: {
          ...next[time],
          [day]: {
            type: "pending",
            subject,
            invites: [...existing, ...newInvites]
          }
        }
      };
    });

    return next;
  });

  // 2️⃣ Prepare payload for backend
const validSlots = eligibleSlots.filter(s => s.slotId);

const payload = {
  subjectId: subject?.id,
  teacherIds,
  slots: validSlots.map(s => ({
    slotId: s.slotId
  }))
};


  // console.log(payload);
  // return;
  // 3️⃣ Send to backend
  try {
    const res = await fetch("/api/invitations/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed");

    console.log("Invite sent:", data);


    addToast(
      `${teacherIds.length} teacher${teacherIds.length !== 1 ? "s" : ""} invited to ${eligibleSlots.length} slots`,
      "info"
    );


  } catch (err) {
    console.error("Error sending invite:", err);
  }

  // 4️⃣ Simulate responses (your existing logic)
  // eligibleSlots.forEach(({ time, day }) => {
  //   teacherIds.forEach(id => scheduleSimulatedResponse(time, day, id));
  // });

  // if (eligibleSlots.length > 1) {
  //   addToast(
  //     `${teacherIds.length} teacher${teacherIds.length !== 1 ? "s" : ""} invited to ${eligibleSlots.length} slots`,
  //     "info"
  //   );
  // }
}

  const eligibleCount = selectedSlots.filter(({time,day})=>slots[time]?.[day]?.type!=="active").length;




  return (
    <div className="min-h-screen bg-[#EBEBED] p-8 font-sans text-[#1E293B]">

      <nav className="flex items-center gap-2 text-[13px] mb-5 text-[#64748B]">
        <BookOpen size={14}/>
        <span className="hover:underline cursor-pointer">Programs</span>
        <ChevronRight size={12} className="text-[#94A3B8]"/>
        <span className="text-[#3B9EFF] font-semibold">CBC First Term 2026</span>
      </nav>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[32px] font-bold text-[#0F172A] tracking-tight">CBC First Term 2026</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-full text-[14px] font-semibold text-[#475569] shadow-sm hover:bg-gray-50 transition">Other Actions <ChevronDown size={16}/></button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#3B9EFF] text-white rounded-full text-[14px] font-semibold shadow-md hover:bg-[#328dec] transition"><Plus size={18}/> Add</button>
        </div>
      </div>

      <div className="flex items-center bg-white/80 backdrop-blur-sm border border-[#E2E8F0] rounded-[20px] mb-10 shadow-sm">
        <Stat label="CBC First Term 2026 Gr..." sub="Date Created: 11 Jan 2025"/>
        <Stat label="12 Jan 2020" sub="Program Start Date"/>
        <Stat label="12 Jan 2020" sub="Program End Date"/>
        <Stat label="CBC" sub="Curriculum" icon={<div className="bg-[#1E293B] text-white text-[9px] px-1 py-0.5 rounded mr-2 font-bold">CBC</div>}/>
        <Stat label="Grade 6" sub="Grade"/>
        <div className="px-6 py-4 border-r border-[#F1F5F9]">
          <p className="text-[11px] font-medium text-[#94A3B8] uppercase mb-1">Subjects</p>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-[#F4F3FF] text-[#5925DC] border border-[#D9D6FE] rounded text-[11px] font-bold">Math</span>
            <span className="px-2 py-0.5 bg-[#F0F9FF] text-[#026AA2] border border-[#B9E6FE] rounded text-[11px] font-bold">Eng</span>
            <span className="text-[11px] text-[#64748B] font-bold">+4</span>
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
          {SIDEBAR.map(item=>(
            <button key={item.name} onClick={()=>setActiveTab(item.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold transition-all
                ${activeTab===item.name?"bg-[#3B9EFF] text-white shadow-lg shadow-blue-200":"text-[#94A3B8] hover:bg-white hover:text-[#475569]"}`}>
              {item.icon}{item.name}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold text-[#0F172A]">Allocate Slots</h2>
            <p className="text-[14px] text-[#64748B]">Select one or more free/pending slots, then invite teachers. First to accept wins.</p>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-bold text-[#0F172A]">28 Feb 2025 – 1 Mar 2025</span>
              <button className="text-[14px] text-[#3B9EFF] font-bold hover:underline">Next Week</button>
            </div>
            <div className="flex items-center bg-white border border-[#E2E8F0] rounded-xl p-1 shadow-sm">
              <button className="px-3 py-1.5 flex items-center gap-1 text-[13px] font-bold border-r border-[#F1F5F9]">2025 <ChevronDown size={14}/></button>
              <div className="flex px-1">
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m=>(
                  <button key={m} className={`px-3 py-1.5 text-[12px] font-bold ${m==="Mar"?"bg-[#D1E9FF] text-[#004EEB] rounded-lg":"text-[#94A3B8] hover:text-[#475569]"}`}>{m}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mb-4">
            {[
              {cls:"border-dashed border-[#CBD5E1]", label:"Free — click to select"},
              {cls:"bg-[#FFFBEB] border-[#FDE68A]",  label:"Pending — click to select"},
              {cls:"bg-[#D1FADF] border-[#6CE9A6]",  label:"Confirmed — click to view"},
            ].map(({cls,label})=>(
              <div key={label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded border-2 ${cls}`}/>
                <span className="text-[12px] font-medium text-[#64748B]">{label}</span>
              </div>
            ))}
          </div>

          {/* Persistent action bar */}
          <div className={`mb-4 flex items-center justify-between px-5 py-3 rounded-2xl border-2 transition-all duration-200
            ${selectedSlots.length>0?"bg-[#EFF6FF] border-[#BFDBFE]":"bg-[#F8FAFC] border-[#E2E8F0]"}`}>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-[#0F172A]">
                {selectedSlots.length>0
                  ? `${selectedSlots.length} slot${selectedSlots.length!==1?"s":""} selected`
                  : "No slots selected"}
              </span>
              {selectedSlots.length>0 && eligibleCount<selectedSlots.length && (
                <span className="text-[11px] text-[#B45309] font-medium">
                  · {selectedSlots.length-eligibleCount} filled will be skipped
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedSlots.length>0 && (
                <button onClick={()=>setSelectedSlots([])}
                  className="px-3 py-1.5 text-[12px] font-bold text-[#64748B] hover:text-[#0F172A] transition">
                  Clear
                </button>
              )}
              <button
                disabled={eligibleCount===0}
                onClick={()=>setInviteModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#3B9EFF] text-white rounded-xl text-[13px] font-bold hover:bg-[#328dec] transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-100 disabled:shadow-none">
                <Send size={13}/>
                {eligibleCount>0
                  ? `Invite to ${eligibleCount} Slot${eligibleCount!==1?"s":""}`
                  : "Select slots to invite"}
              </button>
            </div>
          </div>

          {/* Timetable */}
          <div className="bg-[#F8FAFC]/50 border border-[#CBD5E1] rounded-[24px] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#CBD5E1]">
                  <th className="w-32 p-6 text-left text-[15px] font-bold text-[#0F172A] border-r border-[#CBD5E1]">Time</th>
                  {DAYS.map(d=>(
                    <th key={d.day} className="p-4">
                      <div className="flex flex-col items-center">
                        <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-tighter mb-1">{d.day}</span>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-bold
                          ${d.active?"bg-[#3B9EFF] text-white shadow-md":"text-[#0F172A]"}`}>{d.date}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(slots).map(([time, dayMap], i)=>(
                  <tr key={i}>
                    <td className="p-6 text-[14px] font-bold text-[#0F172A] border-r border-b border-[#CBD5E1] bg-[#F1F5F9]/30 whitespace-nowrap">{time}</td>
                    {DAYS.map(({day})=>(
                      <td key={day} className="p-3 border-b border-[#CBD5E1]">
                        <SlotCell
                          teachers={teachers}
                          slot={dayMap[day]}
                          isSelected={isSelected(time, day)}
                          onToggle={()=>toggleSlotSelect(time, day, i, dayMap[day])}
                          onOpenActive={()=>setActiveSlotModal({time, day, slot:dayMap[day]})}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {inviteModal && (
        <InviteModal
          selectedSlots={selectedSlots}
          allSlots={slots}
          subjects={subjects}
          teachers={teachers}
          onClose={()=>{ setInviteModal(false); setSelectedSlots([]); }}
          onInvite={handleInvite}
        />
      )}

      {activeSlotModal && (
        <ActiveSlotModal
          slot={activeSlotModal.slot}
          time={activeSlotModal.time}
          day={activeSlotModal.day}
          onClose={()=>setActiveSlotModal(null)}
        />
      )}

      <Toast toasts={toasts}/>
    </div>
  );
}

