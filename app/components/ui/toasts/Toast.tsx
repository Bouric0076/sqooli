import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
} from "lucide-react";

export function Toast({toasts}){
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