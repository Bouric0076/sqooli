export function Stat({label,sub,icon}){
  return (
    <div className="px-6 py-4 border-r border-[#F1F5F9]">
      <p className="text-[11px] font-medium text-[#94A3B8] uppercase mb-1 tracking-tight">{sub}</p>
      <div className="flex items-center">{icon}<span className="text-[14px] font-bold text-[#0F172A]">{label}</span></div>
    </div>
  );
}