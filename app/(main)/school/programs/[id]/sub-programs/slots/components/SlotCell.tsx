import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
  Minus,
} from "lucide-react";
import { avatarColor, SUBJECT_COLORS, teacherById } from "../constants";

export function SlotCell({slot, isSelected, onToggle, onOpenActive,teachers}){
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
            {invites.slice(0,3).map(inv => {
              const t = teacherById(inv.teacherId, teachers);
              if (!t) return null;

              const initials =
                t.fullName
                  ?.trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map(n => n[0]?.toUpperCase())
                  .join("") || "";

              return (
                <div
                  key={inv.teacherId}
                  className={`w-5 h-5 rounded-full text-[8px] font-bold flex items-center justify-center text-white ring-2
                    ${inv.status==="accepted"
                      ? "ring-[#6CE9A6]"
                      : inv.status==="declined"
                      ? "ring-[#FECACA] opacity-40"
                      : "ring-[#FDE68A]"
                    }`}
                  style={{ background: avatarColor(initials) }}
                >
                  {initials}
                </div>
              );
            })}
          {invites.length>3&&<span className="text-[10px] font-bold text-[#B45309] ml-0.5">+{invites.length-3}</span>}
        </div>
        <span className="text-[11px] font-bold text-[#B45309]">{pendingN} pending{declinedN?` · ${declinedN} declined`:""}</span>
      </button>
    );
  }

  // Free
  return (
    <>
    {slot?.id && (
    <button onClick={onToggle}
      className={`w-full h-[72px] border-2 rounded-2xl flex flex-col items-center justify-center gap-1 text-[13px] font-bold transition-all cursor-pointer group
        ${isSelected
          ?"border-[#3B9EFF] bg-[#EFF6FF] text-[#3B9EFF] ring-2 ring-[#BFDBFE]"
          :"border-dashed border-[#CBD5E1] text-[#94A3B8] hover:border-[#3B9EFF] hover:text-[#3B9EFF] hover:bg-white"}`}>
      {isSelected
        ? <><SquareCheck size={16}/><span>Selected</span></>
        : <><Plus size={16} className="opacity-60 group-hover:opacity-100"/><span>Free Slot  </span></>}
    </button>
    )}

        {!slot?.id && (
    <button 
      className={`w-full h-[72px] border-2 rounded-2xl flex flex-col items-center justify-center gap-1 text-[13px] font-bold transition-all cursor-pointer group
        ${isSelected
          ?"border-[#3B9EFF] bg-[#EFF6FF] text-[#3B9EFF] ring-2 ring-[#BFDBFE]"
          :"border-dashed border-[#ee3c06] text-[#94A3B8] hover:border-[#3B9EFF] hover:text-[#3B9EFF] hover:bg-white"}`}>
      {isSelected
        ? <><SquareCheck size={16}/><span>Selected</span></>
        : <><Minus size={16} className="opacity-60 group-hover:opacity-100"/><span>Holiday  </span></>}
    </button>
    )}

    </>
  );
}