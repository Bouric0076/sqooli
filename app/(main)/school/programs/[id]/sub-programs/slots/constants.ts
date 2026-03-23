import {
  ChevronRight, ChevronDown, Plus, CalendarDays, Clock, Users,
  GraduationCap, Layers, Handshake, BookOpen, X, Search,
  CheckCircle2, Send, Star, AlertCircle,
  UserCheck, Clock3, XCircle, Bell, SquareCheck, Square,
} from "lucide-react";

export const SUBJECTS = ["Mathematics","English","Science","Social Studies","Kiswahili","Creative Arts"];

export const TEACHERS = [
  { id:1, name:"Dr. Sarah Johnson",  subject:"Mathematics",    avatar:"SJ", rating:4.9, available:true  },
  { id:2, name:"Mr. David Omondi",   subject:"English",        avatar:"DO", rating:4.7, available:true  },
  { id:3, name:"Ms. Grace Wanjiku",  subject:"Science",        avatar:"GW", rating:4.8, available:false },
  { id:4, name:"Mr. Brian Kamau",    subject:"Social Studies", avatar:"BK", rating:4.6, available:true  },
  { id:5, name:"Ms. Amina Hassan",   subject:"Kiswahili",      avatar:"AH", rating:4.9, available:true  },
  { id:6, name:"Dr. Peter Njoroge",  subject:"Creative Arts",  avatar:"PN", rating:4.5, available:false },
];

export const DAYS = [
  { day:"Mon", date:"28", active:true  },
  { day:"Tue", date:"29", active:false },
  { day:"Wed", date:"30", active:false },
  { day:"Thu", date:"31", active:false },
  { day:"Fri", date:"1",  active:false },
];



export const SUBJECT_COLORS = {
  "Mathematics":    { bg:"#F4F3FF", text:"#5925DC", border:"#D9D6FE" },
  "English":        { bg:"#F0F9FF", text:"#026AA2", border:"#B9E6FE" },
  "Science":        { bg:"#ECFDF3", text:"#027A48", border:"#6CE9A6" },
  "Social Studies": { bg:"#FFF7ED", text:"#C2410C", border:"#FED7AA" },
  "Kiswahili":      { bg:"#FEF3C7", text:"#B45309", border:"#FDE68A" },
  "Creative Arts":  { bg:"#FFF1F1", text:"#B91C1C", border:"#FECACA" },
};

export const buildFreeWeek = () => Object.fromEntries(DAYS.map(({day})=>[day,{type:"free"}]));

export const INITIAL_SLOTS = {
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
export const AC = ["#3B82F6","#8B5CF6","#10B981","#F59E0B","#EF4444","#06B6D4"];
export function avatarColor(i){ return AC[i.charCodeAt(0)%AC.length]; }



export function teacherById(id){ return TEACHERS.find(t=>t.id===id); }



export function simulateResponse(cb){ return setTimeout(cb, 2500+Math.random()*3500); }