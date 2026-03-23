import { X, Send, XCircle, CheckCircle2, Search, AlertCircle, Star, UserCheck } from "lucide-react";
import React, { useState } from "react";
import { TEACHERS, SUBJECT_COLORS, SUBJECTS, teacherById } from "../../constants";
import { Avatar } from "../../page";

export function InviteModal({ selectedSlots, allSlots, onClose, onInvite }){
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