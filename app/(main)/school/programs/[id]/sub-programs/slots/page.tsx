"use client";

import React, { useState, useRef } from "react";
import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
} from "lucide-react";

/* ─────────────────────────────────────────────────────── */
const SUBJECTS = ["Mathematics","English","Science","Social Studies","Kiswahili","Creative Arts"];

const TEACHERS = [
  { id:1, name:"Dr. Sarah Johnson",  subject:"Mathematics",    avatar:"SJ", rating:4.9, available:true  },
  { id:2, name:"Mr. David Omondi",   subject:"English",        avatar:"DO", rating:4.7, available:true  },
  { id:3, name:"Ms. Grace Wanjiku",  subject:"Science",        avatar:"GW", rating:4.8, available:false },
  { id:4, name:"Mr. Brian Kamau",    subject:"Social Studies", avatar:"BK", rating:4.6, available:true  },
  { id:5, name:"Ms. Amina Hassan",   subject:"Kiswahili",      avatar:"AH", rating:4.9, available:true  },
  { id:6, name:"Dr. Peter Njoroge",  subject:"Creative Arts",  avatar:"PN", rating:4.5, available:false },
];

const DAYS = [
  { day:"Mon", date:"28", active:true  },
  { day:"Tue", date:"29", active:false },
  { day:"Wed", date:"30", active:false },
  { day:"Thu", date:"31", active:false },
  { day:"Fri", date:"1",  active:false },
];

const SIDEBAR = [
  { name:"Allocate Slots", icon:<CalendarDays size={18}/> },
  { name:"Timetable",      icon:<Clock size={18}/>        },
  { name:"Tutors",         icon:<Users size={18}/>        },
  { name:"Students",       icon:<GraduationCap size={18}/> },
  { name:"Resources",      icon:<Layers size={18}/>       },
  { name:"Partners",       icon:<Handshake size={18}/>    },
];

const SUBJECT_COLORS = {
  "Mathematics":    { bg:"#F4F3FF", text:"#5925DC", border:"#D9D6FE" },
  "English":        { bg:"#F0F9FF", text:"#026AA2", border:"#B9E6FE" },
  "Science":        { bg:"#ECFDF3", text:"#027A48", border:"#6CE9A6" },
  "Social Studies": { bg:"#FFF7ED", text:"#C2410C", border:"#FED7AA" },
  "Kiswahili":      { bg:"#FEF3C7", text:"#B45309", border:"#FDE68A" },
  "Creative Arts":  { bg:"#FFF1F1", text:"#B91C1C", border:"#FECACA" },
};

const buildFreeWeek = () => Object.fromEntries(DAYS.map(({day})=>[day,{type:"free"}]));

const INITIAL_SLOTS = {
  "9:00-10:00": {
    Mon:{ type:"active", code:"CS301",  subject:"Mathematics", teacherName:"Dr. Sarah Johnson", acceptedTeacherId:1, avatarInitials:"SJ" },
    Tue:{ type:"active", code:"ENG302", subject:"English",     teacherName:"Mr. David Omondi",  acceptedTeacherId:2, avatarInitials:"DO" },
    Wed:{type:"free"}, Thu:{type:"free"}, Fri:{type:"free"},
  },
  "10:00-11:00": buildFreeWeek(),
  "11:00-12:00": buildFreeWeek(),
  "12:00-1:00":  buildFreeWeek(),
};

/* ─────────────────────────────────────────────────────── */
const AC = ["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];
function avatarColor(i){ return AC[i.charCodeAt(0)%AC.length]; }

function Avatar({initials, size="md"}){
  const dim = size==="lg"?"w-12 h-12 text-[16px]":size==="sm"?"w-6 h-6 text-[10px]":"w-9 h-9 text-[13px]";
  return (
    <div className={`${dim} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{background:avatarColor(initials)}}>{initials}</div>
  );
}

function teacherById(id){ return TEACHERS.find(t=>t.id===id); }

function StatusPill({status}){
  if(status==="accepted") return <span className="text-[10px] font-bold text-[#027A48] bg-[#ECFDF3] border border-[#6CE9A6] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={10}/>Accepted</span>;
  if(status==="declined") return <span className="text-[10px] font-bold text-[#9A3412] bg-[#FFF1F1] border border-[#FECACA] px-2 py-0.5 rounded-full flex items-center gap-1"><XCircle size={10}/>Declined</span>;
  return <span className="text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 rounded-full flex items-center gap-1"><Clock3 size={10}/>Pending</span>;
}

function simulateResponse(cb){ return setTimeout(cb, 2500+Math.random()*3500); }

/* ─────────────────────────────────────────────────────── */
/* TOAST                                                    */
/* ─────────────────────────────────────────────────────── */
function Toast({toasts}){
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t=>(
        <div key={t.id} className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl text-[13px] font-semibold text-white
          ${t.type==="accept"?"bg-[#027A48]":t.type==="decline"?"bg-[#B91C1C]":"bg-[#1E293B]"}`}>
          {t.type==="accept"?<CheckCircle2 size={16}/>:t.type==="decline"?<XCircle size={16}/>:<Bell size={16}/>}
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* ACTIVE SLOT DETAIL MODAL (read-only)                     */
/* ─────────────────────────────────────────────────────── */
function ActiveSlotModal({slot, time, day, onClose}){
  const teacher = teacherById(slot.acceptedTeacherId);
  const invites = slot.invites || [];
  const subjectColor = slot.subject ? SUBJECT_COLORS[slot.subject] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-[28px] shadow-2xl w-[460px] max-h-[80vh] flex flex-col overflow-hidden border border-[#E2E8F0]">
        <div className="px-7 pt-6 pb-5 border-b border-[#F1F5F9]">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl hover:bg-[#F1F5F9] text-[#94A3B8] transition"><X size={18}/></button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#ECFDF3] flex items-center justify-center"><CheckCircle2 size={18} className="text-[#027A48]"/></div>
            <div>
              <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Confirmed Slot</p>
              <h2 className="text-[18px] font-bold text-[#0F172A]">{day} · {time}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#ECFDF3] border border-[#6CE9A6] rounded-2xl px-4 py-3">
            {teacher && <Avatar initials={teacher.avatar}/>}
            <div>
              <p className="text-[14px] font-bold text-[#027A48]">{teacher?.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[12px] text-[#065F46]">{slot.code}</span>
                {subjectColor && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{background:subjectColor.bg, color:subjectColor.text, borderColor:subjectColor.border}}>
                    {slot.subject}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {invites.length > 0 && (
          <div className="flex-1 overflow-y-auto px-7 py-4 flex flex-col gap-2">
            <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">All Invites</p>
            {invites.map(invite=>{
              const t = teacherById(invite.teacherId); if(!t) return null;
              return (
                <div key={invite.teacherId}
                  className={`flex items-center gap-3 p-3 rounded-xl border
                    ${invite.status==="accepted"?"bg-[#ECFDF3] border-[#6CE9A6]"
                    :invite.status==="declined"?"bg-[#FFF1F1] border-[#FECACA] opacity-60"
                    :"bg-[#F8FAFC] border-[#E2E8F0] opacity-40"}`}>
                  <Avatar initials={t.avatar} size="sm"/>
                  <span className="flex-1 text-[13px] font-bold text-[#0F172A] truncate">{t.name}</span>
                  <StatusPill status={invite.status}/>
                </div>
              );
            })}
          </div>
        )}
        <div className="px-7 pb-6 pt-4 border-t border-[#F1F5F9]">
          <button onClick={onClose}
            className="w-full py-2.5 bg-[#F1F5F9] text-[#475569] rounded-xl text-[14px] font-bold hover:bg-[#E2E8F0] transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* INVITE MODAL — always multi-slot                         */
/* ─────────────────────────────────────────────────────── */
function InviteModal({ selectedSlots, allSlots, onClose, onInvite }){
  const [step, setStep]       = useState("subject");
  const [subject, setSubject] = useState(null);
  const [query, setQuery]     = useState("");
  const [picked, setPicked]   = useState([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const eligibleSlots = selectedSlots.filter(({time,day}) => {
    const s = allSlots[time]?.[day];
    return s && s.type !== "active";
  });
  const skipped = selectedSlots.length - eligibleSlots.length;
  const isSingle = selectedSlots.length === 1;

  const filteredTeachers = TEACHERS.filter(t=>
    (!subject || t.subject === subject) &&
    (t.name.toLowerCase().includes(query.toLowerCase()) ||
     t.subject.toLowerCase().includes(query.toLowerCase()))
  );

  function togglePick(id){ setPicked(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); }

  function handleSend(){
    if(!picked.length || !eligibleSlots.length) return;
    setSending(true);
    setTimeout(()=>{
      onInvite(eligibleSlots, picked, subject);
      setSending(false); setSent(true);
      setTimeout(()=>onClose(), 1600);
    }, 800);
  }

  const subjectColor = subject ? SUBJECT_COLORS[subject] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-[28px] shadow-2xl w-[560px] max-h-[90vh] flex flex-col overflow-hidden border border-[#E2E8F0]">

        {/* Header */}
        <div className="px-7 pt-6 pb-5 border-b border-[#F1F5F9] flex-shrink-0">
          <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl hover:bg-[#F1F5F9] text-[#94A3B8] transition"><X size={18}/></button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] flex items-center justify-center"><Send size={16} className="text-[#3B9EFF]"/></div>
            <div>
              <p className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
                {isSingle ? "Invite Teachers" : "Bulk Invite"}
              </p>
              <h2 className="text-[18px] font-bold text-[#0F172A]">
                {isSingle
                  ? `${selectedSlots[0].day} · ${selectedSlots[0].time}`
                  : `${selectedSlots.length} Slots Selected`}
              </h2>
            </div>
          </div>

          {/* Slot chips for multi */}
          {!isSingle && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSlots.map(({time,day})=>{
                const s = allSlots[time]?.[day];
                const isActive = s?.type==="active";
                return (
                  <div key={`${time}-${day}`}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-bold border
                      ${isActive
                        ?"bg-[#F1F5F9] border-[#CBD5E1] text-[#94A3B8] line-through"
                        :"bg-[#EFF6FF] border-[#BFDBFE] text-[#1D4ED8]"}`}>
                    {isActive && <XCircle size={10}/>}
                    {day} {time}
                  </div>
                );
              })}
            </div>
          )}
          {skipped > 0 && (
            <p className="text-[11px] text-[#B45309] font-medium mb-3">
              ⚠ {skipped} already-filled slot{skipped!==1?"s":""} will be skipped
            </p>
          )}

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {["subject","teachers"].map((s,i)=>(
              <React.Fragment key={s}>
                <div className={`flex items-center gap-1.5 text-[12px] font-bold transition
                  ${step===s?"text-[#3B9EFF]":i===0&&step==="teachers"?"text-[#027A48]":"text-[#CBD5E1]"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px]
                    ${step===s?"bg-[#3B9EFF] text-white":i===0&&step==="teachers"?"bg-[#027A48] text-white":"bg-[#E2E8F0] text-[#94A3B8]"}`}>
                    {i===0&&step==="teachers"?<CheckCircle2 size={11}/>:i+1}
                  </div>
                  {s==="subject"?"Select Subject":"Invite Teachers"}
                </div>
                {i===0 && <div className={`flex-1 h-px ${step==="teachers"?"bg-[#027A48]":"bg-[#E2E8F0]"}`}/>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1 — Subject */}
        {step==="subject" && !sent && (
          <div className="flex-1 overflow-y-auto px-7 py-5">
            <p className="text-[13px] font-semibold text-[#64748B] mb-4">
              Which subject {isSingle?"is this slot":"are these slots"} for?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SUBJECTS.map(sub=>{
                const c = SUBJECT_COLORS[sub];
                const avail = TEACHERS.filter(t=>t.subject===sub && t.available);
                return (
                  <button key={sub} onClick={()=>setSubject(sub)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all
                      ${subject===sub?"border-[#3B9EFF] shadow-md":"border-[#E2E8F0] hover:border-[#94A3B8]"}`}
                    style={subject===sub?{background:c.bg, borderColor:c.border}:{}}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] font-bold" style={{color:subject===sub?c.text:"#0F172A"}}>{sub}</span>
                      {subject===sub && <CheckCircle2 size={15} style={{color:c.text}}/>}
                    </div>
                    <p className="text-[11px] text-[#94A3B8]">{avail.length} teacher{avail.length!==1?"s":""} available</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 — Teachers */}
        {step==="teachers" && !sent && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-7 py-4 border-b border-[#F1F5F9] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                {subjectColor && (
                  <span className="text-[12px] font-bold px-3 py-1 rounded-full border"
                    style={{background:subjectColor.bg, color:subjectColor.text, borderColor:subjectColor.border}}>
                    {subject}
                  </span>
                )}
                <button onClick={()=>{ setStep("subject"); setPicked([]); setQuery(""); }}
                  className="text-[12px] text-[#94A3B8] hover:text-[#475569] font-medium">← Change subject</button>
              </div>
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5">
                <Search size={15} className="text-[#94A3B8]"/>
                <input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search teachers…"
                  className="flex-1 bg-transparent text-[14px] text-[#0F172A] placeholder-[#94A3B8] outline-none font-medium"/>
              </div>
              {picked.length>0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {picked.map(id=>{
                    const t=teacherById(id);
                    return (
                      <div key={id} className="flex items-center gap-1.5 bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] rounded-full px-3 py-1 text-[12px] font-bold">
                        <Avatar initials={t.avatar} size="sm"/>
                        {t.name.split(" ").slice(0,2).join(" ")}
                        <button onClick={()=>togglePick(id)} className="ml-1 opacity-60 hover:opacity-100"><X size={12}/></button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto px-7 py-4 flex flex-col gap-2">
              {filteredTeachers.length===0 && (
                <div className="flex flex-col items-center justify-center py-10 text-[#94A3B8] gap-2">
                  <AlertCircle size={24}/>
                  <p className="text-[13px] font-semibold">No {subject} teachers found</p>
                </div>
              )}
              {filteredTeachers.map(t=>{
                const isSel=picked.includes(t.id);
                return (
                  <button key={t.id} onClick={()=>t.available&&togglePick(t.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all
                      ${!t.available?"opacity-40 cursor-not-allowed border-transparent bg-[#F8FAFC]"
                      :isSel?"border-[#3B9EFF] bg-[#EFF6FF]"
                      :"border-transparent bg-[#F8FAFC] hover:border-[#CBD5E1] hover:bg-white"}`}>
                    <Avatar initials={t.avatar}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-bold text-[#0F172A] truncate">{t.name}</p>
                        {!t.available&&<span className="text-[10px] font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full flex-shrink-0">Busy</span>}
                      </div>
                      <p className="text-[12px] text-[#64748B] font-medium">{t.subject}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-1"><Star size={11} className="text-[#F59E0B] fill-[#F59E0B]"/><span className="text-[12px] font-bold text-[#64748B]">{t.rating}</span></div>
                      {isSel&&<UserCheck size={16} className="text-[#3B9EFF]"/>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Sent */}
        {sent && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-14">
            <div className="w-16 h-16 bg-[#ECFDF3] rounded-full flex items-center justify-center"><CheckCircle2 size={30} className="text-[#027A48]"/></div>
            <p className="text-[17px] font-bold text-[#0F172A]">Invites Sent!</p>
            <p className="text-[13px] text-[#64748B]">{picked.length} teacher{picked.length!==1?"s":""} invited to {eligibleSlots.length} slot{eligibleSlots.length!==1?"s":""}</p>
          </div>
        )}

        {/* Footer */}
        {!sent && (
          <div className="px-7 pb-6 pt-4 border-t border-[#F1F5F9] flex gap-3 flex-shrink-0">
            {step==="teachers" && (
              <button onClick={()=>{ setStep("subject"); setPicked([]); setQuery(""); }}
                className="px-5 py-3 rounded-xl text-[14px] font-bold text-[#475569] bg-[#F1F5F9] hover:bg-[#E2E8F0] transition">
                ← Back
              </button>
            )}
            {step==="subject" ? (
              <button disabled={!subject} onClick={()=>setStep("teachers")}
                className="flex-1 py-3 bg-[#3B9EFF] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#328dec] transition shadow-md shadow-blue-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                Continue →
              </button>
            ) : (
              <button disabled={!picked.length||sending||!eligibleSlots.length} onClick={handleSend}
                className="flex-1 py-3 bg-[#3B9EFF] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#328dec] transition shadow-md shadow-blue-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                {sending?"Sending…":(
                  <><Send size={15}/>Send to {eligibleSlots.length} Slot{eligibleSlots.length!==1?"s":""} · {picked.length} Teacher{picked.length!==1?"s":""}</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────── */
/* SLOT CELL                                                */
/* ─────────────────────────────────────────────────────── */
function SlotCell({slot, isSelected, onToggle, onOpenActive}){
  if(slot.type==="active"){
    const subjectColor = slot.subject ? SUBJECT_COLORS[slot.subject] : null;
    return (
      <button onClick={onOpenActive}
        className="w-full h-[72px] bg-[#D1FADF] border border-[#6CE9A6] rounded-2xl p-3 flex flex-col justify-center shadow-sm hover:brightness-95 transition text-left">
        <div className="flex items-center gap-2 mb-0.5">
          {slot.avatarInitials && (
            <div className="w-5 h-5 rounded-full text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0"
              style={{background:avatarColor(slot.avatarInitials)}}>{slot.avatarInitials}</div>
          )}
          <span className="text-[13px] font-bold text-[#027A48] truncate">{slot.code}</span>
          {subjectColor && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto flex-shrink-0 border"
              style={{background:subjectColor.bg, color:subjectColor.text, borderColor:subjectColor.border}}>
              {slot.subject?.split(" ")[0]}
            </span>
          )}
        </div>
        <span className="text-[11px] text-[#027A48] font-medium opacity-80 truncate">{slot.teacherName}</span>
      </button>
    );
  }

  if(slot.type==="pending"){
    const invites = slot.invites||[];
    const pendingN = invites.filter(i=>i.status==="pending").length;
    const declinedN = invites.filter(i=>i.status==="declined").length;
    return (
      <button onClick={onToggle}
        className={`w-full h-[72px] border-2 rounded-2xl p-3 flex flex-col justify-center shadow-sm transition text-left gap-1
          ${isSelected
            ?"border-[#3B9EFF] bg-[#EFF6FF] ring-2 ring-[#BFDBFE]"
            :"bg-[#FFFBEB] border-[#FDE68A] hover:border-[#3B9EFF]"}`}>
        <div className="flex items-center gap-1">
          {isSelected
            ? <SquareCheck size={14} className="text-[#3B9EFF] mr-0.5 flex-shrink-0"/>
            : <Square size={14} className="text-[#CBD5E1] mr-0.5 flex-shrink-0"/>}
          {invites.slice(0,3).map(inv=>{
            const t=teacherById(inv.teacherId); if(!t) return null;
            return <div key={inv.teacherId}
              className={`w-5 h-5 rounded-full text-[8px] font-bold flex items-center justify-center text-white ring-2
                ${inv.status==="accepted"?"ring-[#6CE9A6]":inv.status==="declined"?"ring-[#FECACA] opacity-40":"ring-[#FDE68A]"}`}
              style={{background:avatarColor(t.avatar)}}>{t.avatar}</div>;
          })}
          {invites.length>3&&<span className="text-[10px] font-bold text-[#B45309] ml-0.5">+{invites.length-3}</span>}
        </div>
        <span className="text-[11px] font-bold text-[#B45309]">{pendingN} pending{declinedN?` · ${declinedN} declined`:""}</span>
      </button>
    );
  }

  // Free
  return (
    <button onClick={onToggle}
      className={`w-full h-[72px] border-2 rounded-2xl flex flex-col items-center justify-center gap-1 text-[13px] font-bold transition-all cursor-pointer group
        ${isSelected
          ?"border-[#3B9EFF] bg-[#EFF6FF] text-[#3B9EFF] ring-2 ring-[#BFDBFE]"
          :"border-dashed border-[#CBD5E1] text-[#94A3B8] hover:border-[#3B9EFF] hover:text-[#3B9EFF] hover:bg-white"}`}>
      {isSelected
        ? <><SquareCheck size={16}/><span>Selected</span></>
        : <><Plus size={16} className="opacity-60 group-hover:opacity-100"/><span>Free Slot</span></>}
    </button>
  );
}

/* ─────────────────────────────────────────────────────── */
/* STAT                                                     */
/* ─────────────────────────────────────────────────────── */
function Stat({label,sub,icon}){
  return (
    <div className="px-6 py-4 border-r border-[#F1F5F9]">
      <p className="text-[11px] font-medium text-[#94A3B8] uppercase mb-1 tracking-tight">{sub}</p>
      <div className="flex items-center">{icon}<span className="text-[14px] font-bold text-[#0F172A]">{label}</span></div>
    </div>
  );
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
  const timers = useRef({});

  function addToast(message, type="info"){
    const id = Date.now()+Math.random();
    setToasts(p=>[...p,{id,message,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)), 4000);
  }

  function toggleSlotSelect(time, day){
    setSelectedSlots(prev=>{
      const exists = prev.find(s=>s.time===time && s.day===day);
      return exists ? prev.filter(s=>!(s.time===time && s.day===day)) : [...prev,{time,day}];
    });
  }

  function isSelected(time, day){ return selectedSlots.some(s=>s.time===time && s.day===day); }

  function applyAccept(prev, time, day, teacherId){
    const slot = prev[time]?.[day];
    if(!slot||slot.type==="active") return prev;
    const invites = (slot.invites||[]).map(i=>({
      ...i,
      status: i.teacherId===teacherId?"accepted":i.status==="pending"?"declined":i.status,
    }));
    const t = teacherById(teacherId);
    return {
      ...prev,
      [time]:{...prev[time],[day]:{
        type:"active",
        code: t.subject.slice(0,3).toUpperCase()+Math.floor(Math.random()*900+100),
        subject: t.subject,
        teacherName: t.name,
        acceptedTeacherId: teacherId,
        avatarInitials: t.avatar,
        invites,
      }}
    };
  }

  function scheduleSimulatedResponse(time, day, teacherId){
    const key = `${time}-${day}-${teacherId}`;
    clearTimeout(timers.current[key]);
    timers.current[key] = simulateResponse(()=>{
      const willAccept = Math.random()<0.6;
      setSlots(prev=>{
        const slot = prev[time]?.[day];
        if(!slot||slot.type==="active"){
          addToast(`${teacherById(teacherId)?.name} responded but slot was already taken.`,"decline");
          return prev;
        }
        const invites = slot.invites||[];
        const alreadyAccepted = invites.some(i=>i.status==="accepted");
        if(alreadyAccepted){
          addToast(`${teacherById(teacherId)?.name} responded late — slot already filled.`,"decline");
          return {...prev,[time]:{...prev[time],[day]:{...slot,invites:invites.map(i=>i.teacherId===teacherId?{...i,status:"declined"}:i)}}};
        }
        if(willAccept){
          const t = teacherById(teacherId);
          addToast(`${t?.name} accepted the slot!`,"accept");
          return applyAccept(prev, time, day, teacherId);
        } else {
          const t = teacherById(teacherId);
          addToast(`${t?.name} declined.`,"decline");
          const updated = invites.map(i=>i.teacherId===teacherId?{...i,status:"declined"}:i);
          const allDone = updated.every(i=>i.status!=="pending");
          const anyAccepted = updated.some(i=>i.status==="accepted");
          if(allDone&&!anyAccepted) return {...prev,[time]:{...prev[time],[day]:{type:"free"}}};
          return {...prev,[time]:{...prev[time],[day]:{...slot,invites:updated}}};
        }
      });
    });
  }

  function handleInvite(eligibleSlots, teacherIds, subject){
    setSlots(prev=>{
      let next = {...prev};
      eligibleSlots.forEach(({time,day})=>{
        const slot = prev[time]?.[day];
        if(!slot||slot.type==="active") return;
        const existing = slot.invites||[];
        const newInvites = teacherIds.map(id=>({teacherId:id, status:"pending"}));
        next = {...next,[time]:{...next[time],[day]:{type:"pending", subject, invites:[...existing,...newInvites]}}};
      });
      return next;
    });
    eligibleSlots.forEach(({time,day})=>{
      teacherIds.forEach(id=>scheduleSimulatedResponse(time, day, id));
    });
    if(eligibleSlots.length > 1){
      addToast(`${teacherIds.length} teacher${teacherIds.length!==1?"s":""} invited to ${eligibleSlots.length} slots`,"info");
    }
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
                          slot={dayMap[day]}
                          isSelected={isSelected(time, day)}
                          onToggle={()=>toggleSlotSelect(time, day)}
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