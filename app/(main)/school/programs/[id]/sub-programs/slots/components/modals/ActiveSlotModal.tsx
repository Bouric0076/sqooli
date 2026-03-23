import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
} from "lucide-react";
import { SUBJECT_COLORS, teacherById } from "../../constants";
import { Avatar, StatusPill } from "../../page";

export function ActiveSlotModal({slot, time, day, onClose}){
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