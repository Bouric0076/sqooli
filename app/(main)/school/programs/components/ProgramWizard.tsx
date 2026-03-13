import { useState } from "react";
import type { FC, ReactNode, CSSProperties } from "react";

// ─── constants/index.ts ──────────────────────────────────────
const inputBase: CSSProperties = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 8,
  padding: "9px 13px", fontSize: 14, color: "#111827", outline: "none",
  background: "white", boxSizing: "border-box", fontFamily: "inherit",
};
const HH: string[] = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MM: string[] = ["00", "15", "30", "45"];
const AP: string[] = ["AM", "PM"];
const DAYS: string[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

interface WizardStep { id: number; stepLabel: string; title: string; }
const WIZARD_STEPS: WizardStep[] = [
  { id: 1, stepLabel: "Step 1/2", title: "Basic Information" },
  { id: 2, stepLabel: "Step 2/2", title: "Business Hours Settings" },
  { id: 4, stepLabel: "Step 4/6", title: "Preview" },
];

interface TimeValue { h: string; m: string; ap: string; }
interface BreakEntry { name: string; from: string; to: string; }
interface DayState { on: boolean; from: TimeValue; to: TimeValue; breaks: BreakEntry[]; }
type DaysState = Record<string, DayState>;

const parseTime = (str: string): TimeValue => {
  const match = str?.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
  if (match) return { h: match[1].padStart(2,"0"), m: match[2].padStart(2,"0"), ap: match[3].toUpperCase() };
  return { h: "08", m: "00", ap: "AM" };
};
const fmtTime  = (t: TimeValue): string => `${t.h}.${t.m} ${t.ap}`;
const defTime  = (): TimeValue => ({ h: "08", m: "30", ap: "AM" });

// ─── components/Icons.tsx ────────────────────────────────────
const ChevronDown: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CalendarIcon: FC = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ArrowLeft: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ArrowRight: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckIcon: FC = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PencilIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon: FC = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const PlusIcon: FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const XIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── components/Primitives.tsx ───────────────────────────────
const Label: FC<{ children: ReactNode }> = ({ children }) => (
  <p style={{ margin: "0 0 6px", fontSize: 13.5, color: "#374151", fontWeight: 500 }}>{children}</p>
);

interface ToggleProps { on: boolean; onChange: (value: boolean) => void; }
const Toggle: FC<ToggleProps> = ({ on, onChange }) => (
  <div onClick={() => onChange(!on)} style={{
    width: 40, height: 22, borderRadius: 11,
    background: on ? "#3b82f6" : "#d1d5db",
    position: "relative", cursor: "pointer",
    transition: "background .2s", flexShrink: 0,
  }}>
    <div style={{
      position: "absolute", top: 3, left: on ? 21 : 3,
      width: 16, height: 16, borderRadius: "50%",
      background: "white", transition: "left .2s",
      boxShadow: "0 1px 3px rgba(0,0,0,.2)",
    }} />
  </div>
);

interface SpinnerProps { value: string; options: string[]; onChange: (v: string) => void; }
const Spinner: FC<SpinnerProps> = ({ value, options, onChange }) => {
  const idx = options.indexOf(value);
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 6, overflow: "hidden", background: "white" }}>
      <span style={{ padding: "7px 10px", fontSize: 14, color: "#111827", minWidth: 40, textAlign: "center" }}>{value}</span>
      <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid #e5e7eb" }}>
        <button onClick={() => onChange(options[(idx - 1 + options.length) % options.length])}
          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px 6px", color: "#6b7280", fontSize: 9, lineHeight: 1.2 }}>▲</button>
        <button onClick={() => onChange(options[(idx + 1) % options.length])}
          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px 6px", color: "#6b7280", fontSize: 9, lineHeight: 1.2 }}>▼</button>
      </div>
    </div>
  );
};

interface TimeRangeProps { label: string; time: TimeValue; onChange: (v: TimeValue) => void; }
const TimeRange: FC<TimeRangeProps> = ({ label, time, onChange }) => (
  <div>
    <p style={{ margin: "0 0 5px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{label}</p>
    <div style={{ display: "flex", gap: 4 }}>
      <Spinner value={time.h}  options={HH} onChange={v => onChange({ ...time, h: v })} />
      <Spinner value={time.m}  options={MM} onChange={v => onChange({ ...time, m: v })} />
      <Spinner value={time.ap} options={AP} onChange={v => onChange({ ...time, ap: v })} />
    </div>
  </div>
);

// ─── components/Select.tsx ───────────────────────────────────
interface DropdownProps { placeholder: string; options: string[]; value: string; onChange: (v: string) => void; }
const Dropdown: FC<DropdownProps> = ({ placeholder, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...inputBase, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: value ? "#111827" : "#9ca3af", paddingRight: 10 }}>
        <span>{value || placeholder}</span>
        <span style={{ color: "#9ca3af" }}><ChevronDown /></span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1px solid #d1d5db", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 200 }}>
          {options.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }}
              style={{ padding: "9px 13px", fontSize: 14, cursor: "pointer", color: "#111827" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "")}
            >{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

interface MultiSelectProps { options: string[]; selected: string[]; onAdd: (v: string) => void; onRemove: (v: string) => void; }
const MultiSelect: FC<MultiSelectProps> = ({ options, selected, onAdd, onRemove }) => {
  const [open, setOpen] = useState(false);
  const avail = options.filter(o => !selected.includes(o));
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...inputBase, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#9ca3af", paddingRight: 10 }}>
        <span>Select...</span>
        <span style={{ color: "#9ca3af" }}><ChevronDown /></span>
      </div>
      {open && avail.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1px solid #d1d5db", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 200 }}>
          {avail.map(o => (
            <div key={o} onClick={() => { onAdd(o); setOpen(false); }}
              style={{ padding: "9px 13px", fontSize: 14, cursor: "pointer", color: "#111827" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "")}
            >{o}</div>
          ))}
        </div>
      )}
      {selected.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {selected.map(s => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "white", border: "1px solid #d1d5db", borderRadius: 20, padding: "3px 10px", fontSize: 13, color: "#374151" }}>
              {s}
              <span onClick={() => onRemove(s)} style={{ cursor: "pointer", color: "#6b7280", fontSize: 16, lineHeight: 1 }}>×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── components/BreakEditModal.tsx ───────────────────────────
interface BreakEditModalProps { brk: BreakEntry; title?: string; onSave: (b: BreakEntry) => void; onClose: () => void; }
const BreakEditModal: FC<BreakEditModalProps> = ({ brk, title = "Edit Break", onSave, onClose }) => {
  const [name, setName] = useState<string>(brk.name);
  const [from, setFrom] = useState<TimeValue>(parseTime(brk.from));
  const [to, setTo]     = useState<TimeValue>(parseTime(brk.to));
  const handleSave = () => { onSave({ name: name.trim() || "Break", from: fmtTime(from), to: fmtTime(to) }); onClose(); };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", width: 420, padding: "28px 28px 24px", fontFamily: "inherit" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}><XIcon /></button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Label>Break Name</Label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Tea Break" style={inputBase} />
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 26 }}>
          <div style={{ flex: 1 }}>
            <Label>From</Label>
            <div style={{ display: "flex", gap: 4 }}>
              <Spinner value={from.h}  options={HH} onChange={v => setFrom(f => ({ ...f, h: v }))} />
              <Spinner value={from.m}  options={MM} onChange={v => setFrom(f => ({ ...f, m: v }))} />
              <Spinner value={from.ap} options={AP} onChange={v => setFrom(f => ({ ...f, ap: v }))} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Label>To</Label>
            <div style={{ display: "flex", gap: 4 }}>
              <Spinner value={to.h}  options={HH} onChange={v => setTo(t => ({ ...t, h: v }))} />
              <Spinner value={to.m}  options={MM} onChange={v => setTo(t => ({ ...t, m: v }))} />
              <Spinner value={to.ap} options={AP} onChange={v => setTo(t => ({ ...t, ap: v }))} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ border: "1.5px solid #d1d5db", borderRadius: 24, padding: "8px 20px", background: "white", fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={handleSave} style={{ border: "none", borderRadius: 24, padding: "8px 22px", background: "#1960ae", fontSize: 14, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(25,96,174,.35)" }}>Save</button>
        </div>
      </div>
    </div>
  );
};

// ─── components/Sidebar.tsx ──────────────────────────────────
interface SidebarProps { step: number; done: number[]; }
const Sidebar: FC<SidebarProps> = ({ step, done }) => (
  <div style={{ width: 252, flexShrink: 0, borderRight: "1px solid #e5e7eb", background: "white", padding: "40px 0 24px" }}>
    {WIZARD_STEPS.map(item => {
      const active   = item.id === step;
      const complete = done.includes(item.id);
      return (
        <div key={item.id} style={{ position: "relative", padding: "7px 28px 7px 34px", marginBottom: 14 }}>
          {active && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#3b82f6", borderRadius: "0 3px 3px 0" }} />}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: active ? "#3b82f6" : "#9ca3af" }}>{item.stepLabel}</span>
            {complete && (
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#3b82f6", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><CheckIcon /></span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#111827" : "#6b7280" }}>{item.title}</p>
        </div>
      );
    })}
  </div>
);

// ─── components/WizardFooter.tsx ─────────────────────────────
interface WizardFooterProps { onBack: () => void; onNext: () => void; }
const WizardFooter: FC<WizardFooterProps> = ({ onBack, onNext }) => (
  <div style={{ padding: "16px 44px", borderTop: "1px solid #e5e7eb", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, border: "1.5px solid #d1d5db", borderRadius: 24, padding: "9px 22px", background: "white", fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>
      <ArrowLeft /> Back
    </button>
    <button onClick={onNext} style={{ display: "flex", alignItems: "center", gap: 8, border: "none", borderRadius: 24, padding: "10px 28px", background: "#1960ae", fontSize: 14, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 10px rgba(25,96,174,.4)" }}>
      Save & Continue <ArrowRight />
    </button>
  </div>
);

// ─── components/BasicInformation.tsx ────────────────────────
const BasicInformation: FC = () => {
  const [subProgram, setSubProgram] = useState<string>("");
  const [eduLevel, setEduLevel]     = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState<string>("");
  const [subjects, setSubjects]     = useState<string[]>(["Mathematics", "English"]);
  const [startDate, setStartDate]   = useState<string>("");
  const [endDate, setEndDate]       = useState<string>("");
  return (
    <>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111827" }}>Basic Information</h2>
      <p style={{ margin: "0 0 26px", fontSize: 14, color: "#6b7280" }}>Add basic information about your resource</p>
      <div style={{ marginBottom: 20 }}>
        <Label>Sub- Program</Label>
        <input value={subProgram} onChange={e => setSubProgram(e.target.value)} style={inputBase} />
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <Label>Education Level</Label>
          <Dropdown placeholder="Select..." options={["Primary","Secondary","Higher"]} value={eduLevel} onChange={setEduLevel} />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Grade Level</Label>
          <Dropdown placeholder="Select..." options={["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5"]} value={gradeLevel} onChange={setGradeLevel} />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Label>Subject(s)</Label>
        <MultiSelect options={["Mathematics","English","Science","History","Art","Music"]} selected={subjects} onAdd={s => setSubjects(p => [...p, s])} onRemove={s => setSubjects(p => p.filter(x => x !== s))} />
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Label>Program Start Date</Label>
          <div style={{ position: "relative" }}>
            <input placeholder="DD/MM/YYYY" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ ...inputBase, paddingRight: 38, color: startDate ? "#111827" : "#9ca3af" }} />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}><CalendarIcon /></span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Label>Program End Date</Label>
          <div style={{ position: "relative" }}>
            <input placeholder="DD/MM/YYYY" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ ...inputBase, paddingRight: 38, color: endDate ? "#111827" : "#9ca3af" }} />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}><CalendarIcon /></span>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── components/DayRow.tsx ───────────────────────────────────
interface DayRowProps { day: string; dayData: DayState; onUpdate: (patch: Partial<DayState>) => void; onOpenBreakModal: (index: number) => void; }
const DayRow: FC<DayRowProps> = ({ day, dayData, onUpdate, onOpenBreakModal }) => {
  const { on, from, to, breaks } = dayData;
  return (
    <div style={{ paddingTop: 16, paddingBottom: 16, borderBottom: "1px solid #f3f4f6" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: on ? 14 : 0 }}>
        <Toggle on={on} onChange={v => onUpdate({ on: v })} />
        <span style={{ fontSize: 14.5, fontWeight: on ? 600 : 400, color: on ? "#111827" : "#6b7280" }}>{day}</span>
      </div>
      {on && (
        <div style={{ marginLeft: 52 }}>
          <div style={{ display: "flex", gap: 28, marginBottom: 16 }}>
            <TimeRange label="From" time={from} onChange={v => onUpdate({ from: v })} />
            <TimeRange label="To"   time={to}   onChange={v => onUpdate({ to: v })} />
          </div>
          <p style={{ margin: "0 0 8px", fontSize: 13.5, fontWeight: 600, color: "#374151" }}>Break Time</p>
          {breaks.length > 0 && (
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 60px", background: "#f9fafb", padding: "8px 14px", borderBottom: "1px solid #e5e7eb" }}>
                {(["Name","From","To",""] as const).map((h, i) => (
                  <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
                ))}
              </div>
              {breaks.map((b: BreakEntry, bi: number) => (
                <div key={bi} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 60px", padding: "10px 14px", alignItems: "center", borderBottom: bi < breaks.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <span style={{ fontSize: 13.5, color: "#111827" }}>{b.name}</span>
                  <span style={{ fontSize: 13.5, color: "#374151" }}>{b.from}</span>
                  <span style={{ fontSize: 13.5, color: "#374151" }}>{b.to}</span>
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={() => onUpdate({ breaks: breaks.filter((_, j) => j !== bi) })} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}><TrashIcon /></button>
                    <button onClick={() => onOpenBreakModal(bi)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}><PencilIcon /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onOpenBreakModal(-1)} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1.5px solid #3b82f6", borderRadius: 20, padding: "5px 16px", background: "white", color: "#3b82f6", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <PlusIcon /> Add Break
          </button>
        </div>
      )}
    </div>
  );
};

// ─── components/BusinessHours.tsx ───────────────────────────
interface EditBreakTarget { day: string; index: number; }
const initDayState = (): DaysState =>
  Object.fromEntries(DAYS.map((day, i) => [day, {
    on: i < 5, from: defTime(), to: { h: "05", m: "00", ap: "PM" },
    breaks: day === "Tuesday" ? [{ name: "Tea Break", from: "08.30 AM", to: "17.00 PM" }] : [],
  }]));

const BusinessHours: FC = () => {
  const [tab, setTab]             = useState<string>("regular");
  const [ds, setDs]               = useState<DaysState>(initDayState);
  const [editBreak, setEditBreak] = useState<EditBreakTarget | null>(null);

  const updateDay = (day: string, patch: Partial<DayState>) =>
    setDs(s => ({ ...s, [day]: { ...s[day], ...patch } }));

  const handleBreakSave = (updated: BreakEntry) => {
    if (!editBreak) return;
    const { day, index } = editBreak;
    const current = ds[day].breaks;
    updateDay(day, { breaks: index === -1 ? [...current, updated] : current.map((b, i) => i === index ? updated : b) });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111827" }}>Business Hours Settings</h2>
          <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6b7280" }}>Setup business hours for this program</p>
        </div>
        <button style={{ border: "1px solid #d1d5db", borderRadius: 8, padding: "7px 18px", background: "white", fontSize: 14, color: "#374151", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>Skip</button>
      </div>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, background: "white", overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", paddingLeft: 4 }}>
          {([["regular","Regular School Day"],["holiday","Holiday"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", padding: "13px 18px", fontSize: 14, fontWeight: 500, color: tab === key ? "#3b82f6" : "#6b7280", borderBottom: tab === key ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -1 }}>{label}</button>
          ))}
        </div>
        <div style={{ padding: "0 20px", maxHeight: 380, overflowY: "auto" }}>
          {DAYS.map(day => (
            <DayRow key={day} day={day} dayData={ds[day]} onUpdate={patch => updateDay(day, patch)} onOpenBreakModal={index => setEditBreak({ day, index })} />
          ))}
        </div>
      </div>
      {editBreak && (
        <BreakEditModal
          brk={editBreak.index === -1 ? { name: "", from: "10.00 AM", to: "10.30 AM" } : ds[editBreak.day].breaks[editBreak.index]}
          title={editBreak.index === -1 ? "Add Break" : "Edit Break"}
          onSave={handleBreakSave}
          onClose={() => setEditBreak(null)}
        />
      )}
    </>
  );
};

// ─── ProgramWizard.tsx (root) ────────────────────────────────
export default function ProgramWizard() {
  const [step, setStep] = useState<number>(1);
  const [done, setDone] = useState<number[]>([]);
  const goNext = () => { setDone(d => [...new Set([...d, step])]); setStep(s => Math.min(s + 1, 2)); };
  const goBack = () => setStep(s => Math.max(s - 1, 1));
  return (
    <div style={{ display: "flex", width: "100%", 
    alignItems: "center", 
    justifyContent: "center",  
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      <div style={{ width: "100%",display: "flex", overflow: "hidden", }}>
        <Sidebar step={step} done={done} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "38px 44px 28px" }}>
            {step === 1 && <BasicInformation />}
            {step === 2 && <BusinessHours />}
          </div>
          <WizardFooter onBack={goBack} onNext={goNext} />
        </div>
      </div>
    </div>
  );
}
