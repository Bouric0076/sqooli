"use client";
import { useState } from "react";

/* ─── Icons ─────────────────────────────────────────────── */
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CalendarIcon = ({ color = "#9ca3af" }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const CheckIcon = ({ color = "white", size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PencilIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const CopyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SunIcon = ({ color = "#f59e0b", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const ClockIcon = ({ color = "#6b7280", size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const BookIcon = ({ color = "#6b7280", size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const EditJumpIcon = ({ color = "#3b82f6", size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

/* ─── Shared ─────────────────────────────────────────────── */
const inputBase = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 8,
  padding: "9px 13px", fontSize: 14, color: "#111827", outline: "none",
  background: "white", boxSizing: "border-box", fontFamily: "inherit",
};
const Label = ({ children }) => (
  <p style={{ margin: "0 0 6px", fontSize: 13.5, color: "#374151", fontWeight: 500 }}>{children}</p>
);
const th = { border: "1px solid #e5e7eb", padding: "6px", textAlign: "left" };
const td = { border: "1px solid #e5e7eb", padding: "6px" };
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ─── TIME ENGINE ─────────────────────────────────────────── */
const toMinutes = (t) => {
  let h = parseInt(t.h); const m = parseInt(t.m);
  if (t.ap === "PM" && h !== 12) h += 12;
  if (t.ap === "AM" && h === 12) h = 0;
  return h * 60 + m;
};
const parseBreakStr = (str) => {
  const match = str.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1]); const m = parseInt(match[2]); const ap = match[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + m;
};
const toTimeStr = (mins) => {
  let h = Math.floor(mins / 60); const m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12; if (h === 0) h = 12;
  return `${String(h).padStart(2,"0")}.${String(m).padStart(2,"0")} ${ap}`;
};
const fmtTimeObj = (t) => `${t.h}.${t.m} ${t.ap}`;
const generateTimeline = (d, lessonDuration) => {

  const start = toMinutes(d.from); const end = toMinutes(d.to);
  if (end <= start) return [];
  const breaks = d.breaks
    .map(b => ({ start: Math.max(start, parseBreakStr(b.from)), end: Math.min(end, parseBreakStr(b.to)) }))
    .filter(b => b.end > b.start).sort((a, b) => a.start - b.start);
  const timeline = []; let cursor = start;
  breaks.forEach(b => {
    while (cursor + lessonDuration <= b.start) {
      timeline.push({ type: "lesson", from: toTimeStr(cursor), to: toTimeStr(cursor + lessonDuration) });
      cursor += lessonDuration;
    }
    if (b.start >= start && b.end <= end) timeline.push({ type: "break", from: toTimeStr(b.start), to: toTimeStr(b.end) });
    cursor = Math.max(cursor, b.end);
  });
  while (cursor + lessonDuration <= end) {
    timeline.push({ type: "lesson", from: toTimeStr(cursor), to: toTimeStr(cursor + lessonDuration) });
    cursor += lessonDuration;
  }
  return timeline;

};

/* ─── Toggle ─────────────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <div onClick={() => onChange(!on)} style={{ width: 40, height: 22, borderRadius: 11, background: on ? "#3b82f6" : "#d1d5db", position: "relative", cursor: "pointer", transition: "background .2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
    </div>
  );
}

/* ─── Spinner ────────────────────────────────────────────── */
function Spinner({ value, options, onChange }) {
  const idx = options.indexOf(value);
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 6, overflow: "hidden", background: "white" }}>
      <span style={{ padding: "7px 10px", fontSize: 14, color: "#111827", minWidth: 40, textAlign: "center" }}>{value}</span>
      <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid #e5e7eb" }}>
        <button onClick={() => onChange(options[(idx - 1 + options.length) % options.length])} style={{ border: "none", background: "none", cursor: "pointer", padding: "2px 6px", color: "#6b7280", fontSize: 9, lineHeight: 1.2 }}>▲</button>
        <button onClick={() => onChange(options[(idx + 1) % options.length])} style={{ border: "none", background: "none", cursor: "pointer", padding: "2px 6px", color: "#6b7280", fontSize: 9, lineHeight: 1.2 }}>▼</button>
      </div>
    </div>
  );
}
const HH = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MM = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const AP = ["AM", "PM"];

function TimeRange({ label, time, onChange }) {
  return (
    <div>
      <p style={{ margin: "0 0 5px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{label}</p>
      <div style={{ display: "flex", gap: 4 }}>
        <Spinner value={time.h} options={HH} onChange={v => onChange({ ...time, h: v })} />
        <Spinner value={time.m} options={MM} onChange={v => onChange({ ...time, m: v })} />
        <Spinner value={time.ap} options={AP} onChange={v => onChange({ ...time, ap: v })} />
      </div>
    </div>
  );
}

/* ─── Dropdown ───────────────────────────────────────────── */
function Dropdown({ placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...inputBase, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: value ? "#111827" : "#9ca3af", paddingRight: 10 }}>
        <span>{value || placeholder}</span><span style={{ color: "#9ca3af" }}><ChevronDown /></span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1px solid #d1d5db", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 200 }}>
          {options.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }} style={{ padding: "9px 13px", fontSize: 14, cursor: "pointer", color: "#111827" }} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MultiSelect ────────────────────────────────────────── */
function MultiSelect({ options, selected, onAdd, onRemove }) {
  const [open, setOpen] = useState(false);
  const avail = options.filter(o => !selected.includes(o));
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(o => !o)} style={{ ...inputBase, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#9ca3af", paddingRight: 10 }}>
        <span>Select...</span><span style={{ color: "#9ca3af" }}><ChevronDown /></span>
      </div>
      {open && avail.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1px solid #d1d5db", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 200 }}>
          {avail.map(o => (
            <div key={o} onClick={() => { onAdd(o); setOpen(false); }} style={{ padding: "9px 13px", fontSize: 14, cursor: "pointer", color: "#111827" }} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>{o}</div>
          ))}
        </div>
      )}
      {selected.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {selected.map(s => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "white", border: "1px solid #d1d5db", borderRadius: 20, padding: "3px 10px", fontSize: 13, color: "#374151" }}>
              {s}<span onClick={() => onRemove(s)} style={{ cursor: "pointer", color: "#6b7280", fontSize: 16, lineHeight: 1 }}>×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Break Edit Modal ───────────────────────────────────── */
function BreakEditModal({ brk, title = "Edit Break", onSave, onClose }) {
  const parseTime = (str) => {
    const match = str && str.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
    if (match) return { h: match[1].padStart(2,"0"), m: match[2].padStart(2,"0"), ap: match[3].toUpperCase() };
    return { h: "08", m: "00", ap: "AM" };
  };
  const [name, setName] = useState(brk.name);
  const [from, setFrom] = useState(parseTime(brk.from));
  const [to, setTo] = useState(parseTime(brk.to));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", padding: "28px 28px 24px", fontFamily: "inherit" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><XIcon /></button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Label>Break Name</Label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputBase} placeholder="e.g. Tea Break" />
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 26 }}>
          <div style={{ flex: 1 }}>
            <Label>From</Label>
            <div style={{ display: "flex", gap: 4 }}>
              <Spinner value={from.h} options={HH} onChange={v => setFrom(f => ({ ...f, h: v }))} />
              <Spinner value={from.m} options={MM} onChange={v => setFrom(f => ({ ...f, m: v }))} />
              <Spinner value={from.ap} options={AP} onChange={v => setFrom(f => ({ ...f, ap: v }))} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Label>To</Label>
            <div style={{ display: "flex", gap: 4 }}>
              <Spinner value={to.h} options={HH} onChange={v => setTo(t => ({ ...t, h: v }))} />
              <Spinner value={to.m} options={MM} onChange={v => setTo(t => ({ ...t, m: v }))} />
              <Spinner value={to.ap} options={AP} onChange={v => setTo(t => ({ ...t, ap: v }))} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ border: "1.5px solid #d1d5db", borderRadius: 24, padding: "8px 20px", background: "white", fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={() => { onSave({ name: name.trim() || "Break", from: fmtTimeObj(from), to: fmtTimeObj(to) }); onClose(); }} style={{ border: "none", borderRadius: 24, padding: "8px 22px", background: "#1960ae", fontSize: 14, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(25,96,174,.35)" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Duplicate Break Modal ──────────────────────────────── */
function DuplicateBreakModal({ brk, sourceDay, activeDays, onDuplicate, onClose }) {
  const targets = activeDays.filter(d => d !== sourceDay);
  const [selected, setSelected] = useState([]);
  const toggleDay = (d) => setSelected(s => s.includes(d) ? s.filter(x => x !== d) : [...s, d]);
  const allSelected = selected.length === targets.length;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", width: 400, padding: "26px 26px 22px", fontFamily: "inherit" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}><CopyIcon /></div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>Duplicate Break</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><XIcon /></button>
        </div>
        <div style={{ margin: "14px 0 16px", background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "#92400e" }}>{brk.name}</span>
          <span style={{ fontSize: 12.5, color: "#b45309" }}>{brk.from} – {brk.to}</span>
        </div>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280" }}>Copy this break to other active days. Each day stays independent — edit them separately afterwards.</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Days</span>
          <button onClick={() => setSelected(allSelected ? [] : [...targets])} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12.5, fontWeight: 600, color: "#3b82f6", fontFamily: "inherit" }}>{allSelected ? "Deselect all" : "Select all"}</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 22, maxHeight: 240, overflowY: "auto" }}>
          {targets.map(d => {
            const checked = selected.includes(d);
            return (
              <div key={d} onClick={() => toggleDay(d)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", background: checked ? "#eff6ff" : "#f9fafb", border: checked ? "1.5px solid #bfdbfe" : "1.5px solid transparent", transition: "all .15s" }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, border: checked ? "none" : "2px solid #d1d5db", background: checked ? "#3b82f6" : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s" }}>
                  {checked && <CheckIcon />}
                </div>
                <span style={{ fontSize: 14, fontWeight: checked ? 600 : 400, color: checked ? "#1d4ed8" : "#374151" }}>{d}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "#9ca3af" }}>{selected.length > 0 ? `${selected.length} day${selected.length > 1 ? "s" : ""} selected` : "No days selected"}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ border: "1.5px solid #d1d5db", borderRadius: 24, padding: "7px 18px", background: "white", fontSize: 13.5, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button disabled={selected.length === 0} onClick={() => { onDuplicate(selected); onClose(); }} style={{ border: "none", borderRadius: 24, padding: "7px 20px", background: selected.length > 0 ? "#1960ae" : "#e5e7eb", fontSize: 13.5, fontWeight: 600, color: selected.length > 0 ? "white" : "#9ca3af", cursor: selected.length > 0 ? "pointer" : "not-allowed", fontFamily: "inherit", boxShadow: selected.length > 0 ? "0 2px 8px rgba(25,96,174,.3)" : "none", transition: "all .15s" }}>Duplicate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Holiday Edit Modal ─────────────────────────────────── */
function HolidayEditModal({ holiday, title = "Add Holiday", onSave, onClose }) {
  const [name, setName] = useState(holiday.name || "");
  const [startDate, setStartDate] = useState(holiday.startDate || "");
  const [endDate, setEndDate] = useState(holiday.endDate || "");
  const [recurring, setRecurring] = useState(holiday.recurring || false);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", width: 440, padding: "28px 28px 24px", fontFamily: "inherit" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}><SunIcon /></div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>{title}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><XIcon /></button>
        </div>
        <div style={{ marginBottom: 18 }}>
          <Label>Holiday Name</Label>
          <input value={name} onChange={e => setName(e.target.value)} style={inputBase} placeholder="e.g. Christmas Day" />
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
          <div style={{ flex: 1 }}>
            <Label>Start Date</Label>
            <div style={{ position: "relative" }}>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ ...inputBase, paddingRight: 38 }} />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><CalendarIcon /></span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Label>End Date</Label>
            <div style={{ position: "relative" }}>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ ...inputBase, paddingRight: 38 }} />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><CalendarIcon /></span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 16px", marginBottom: 26 }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" }}>Recurring Holiday</p>
            <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#6b7280" }}>Repeat this holiday every year</p>
          </div>
          <Toggle on={recurring} onChange={setRecurring} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ border: "1.5px solid #d1d5db", borderRadius: 24, padding: "8px 20px", background: "white", fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
          <button onClick={() => { if (!name.trim() || !startDate) return; onSave({ name: name.trim(), startDate, endDate: endDate || startDate, recurring }); onClose(); }} style={{ border: "none", borderRadius: 24, padding: "8px 22px", background: "#1960ae", fontSize: 14, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(25,96,174,.35)" }}>Save Holiday</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Holiday Section ────────────────────────────────────── */
function HolidaySection({ holidays, onAdd, onEdit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const formatDate = (d) => { if (!d) return "—"; return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); };
  const getDuration = (s, e) => { if (!s || !e) return ""; const days = Math.round((new Date(e) - new Date(s)) / 86400000) + 1; return days === 1 ? "1 day" : `${days} days`; };
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: "#111827" }}>Holidays</p>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#6b7280" }}>Define days when the program will not run</p>
        </div>
        <button onClick={() => { setEditingIndex(null); setShowModal(true); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1.5px solid #3b82f6", borderRadius: 20, padding: "6px 16px", background: "white", color: "#3b82f6", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <PlusIcon /> Add Holiday
        </button>
      </div>
      {holidays.length === 0 && (
        <div style={{ border: "2px dashed #e5e7eb", borderRadius: 12, padding: "40px 24px", textAlign: "center", background: "#fafafa" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><SunIcon /></div>
          <p style={{ margin: "0 0 4px", fontSize: 14.5, fontWeight: 600, color: "#374151" }}>No holidays added yet</p>
          <p style={{ margin: 0, fontSize: 13, color: "#9ca3af" }}>Add public holidays, school breaks, or any days off.</p>
        </div>
      )}
      {holidays.length > 0 && (
        <>
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 80px 60px", background: "#f9fafb", padding: "9px 16px", borderBottom: "1px solid #e5e7eb" }}>
              {["Holiday Name", "Start Date", "End Date", "Duration", ""].map((h, i) => (
                <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
              ))}
            </div>
            {holidays.map((h, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 80px 60px", padding: "12px 16px", alignItems: "center", borderBottom: i < holidays.length - 1 ? "1px solid #f3f4f6" : "none", background: "white" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><SunIcon /></div>
                  <div>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#111827" }}>{h.name}</span>
                    {h.recurring && <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 600, background: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: 20, padding: "1px 7px" }}>Recurring</span>}
                  </div>
                </div>
                <span style={{ fontSize: 13.5, color: "#374151" }}>{formatDate(h.startDate)}</span>
                <span style={{ fontSize: 13.5, color: "#374151" }}>{formatDate(h.endDate)}</span>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: "#6b7280", background: "#f3f4f6", borderRadius: 20, padding: "2px 10px", display: "inline-block" }}>{getDuration(h.startDate, h.endDate)}</span>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button onClick={() => onDelete(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><TrashIcon /></button>
                  <button onClick={() => { setEditingIndex(i); setShowModal(true); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><PencilIcon /></button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <span style={{ fontSize: 13, color: "#1d4ed8" }}><strong>{holidays.length}</strong> holiday{holidays.length !== 1 ? "s" : ""} added — {holidays.filter(h => h.recurring).length} recurring, {holidays.filter(h => !h.recurring).length} one-time</span>
          </div>
        </>
      )}
      {showModal && (
        <HolidayEditModal
          holiday={editingIndex !== null ? holidays[editingIndex] : { name: "", startDate: "", endDate: "", recurring: false }}
          title={editingIndex !== null ? "Edit Holiday" : "Add Holiday"}
          onSave={(updated) => { editingIndex !== null ? onEdit(editingIndex, updated) : onAdd(updated); }}
          onClose={() => { setShowModal(false); setEditingIndex(null); }}
        />
      )}
    </div>
  );
}

/* ─── Step 1 ─────────────────────────────────────────────── */
function BasicInformation({ data, onChange }) {
  const { sub, edu, grades, subjects, startDate, endDate } = data;
  return (
    <>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111827" }}>Basic Information</h2>
      <p style={{ margin: "0 0 26px", fontSize: 14, color: "#6b7280" }}>Add basic information about your resource</p>
      <div style={{ marginBottom: 20 }}>
        <Label>Sub-Program</Label>
        <input value={sub} onChange={e => onChange({ ...data, sub: e.target.value })} style={inputBase} />
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <Label>Education Level</Label>
          <Dropdown placeholder="Select..." options={["Primary", "Secondary", "Higher"]} value={edu} onChange={v => onChange({ ...data, edu: v })} />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Grade Level</Label>
          <MultiSelect options={["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5"]} selected={grades} onAdd={g => onChange({ ...data, grades: [...grades, g] })} onRemove={g => onChange({ ...data, grades: grades.filter(x => x !== g) })} />
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Label>Subject(s)</Label>
        <MultiSelect options={["Mathematics","English","Science","History","Art","Music"]} selected={subjects} onAdd={s => onChange({ ...data, subjects: [...subjects, s] })} onRemove={s => onChange({ ...data, subjects: subjects.filter(x => x !== s) })} />
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Label>Program Start Date</Label>
          <div style={{ position: "relative" }}>
            <input placeholder="DD/MM/YYYY" value={startDate} onChange={e => onChange({ ...data, startDate: e.target.value })} style={{ ...inputBase, paddingRight: 38, color: startDate ? "#111827" : "#9ca3af" }} />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}><CalendarIcon /></span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Label>Program End Date</Label>
          <div style={{ position: "relative" }}>
            <input placeholder="DD/MM/YYYY" value={endDate} onChange={e => onChange({ ...data, endDate: e.target.value })} style={{ ...inputBase, paddingRight: 38, color: endDate ? "#111827" : "#9ca3af" }} />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}><CalendarIcon /></span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Step 2 ─────────────────────────────────────────────── */
function BusinessHours({ data, onChange }) {
  const { lessonDuration, days: ds, holidays } = data;
  const [tab, setTab] = useState("regular");
  const [editBreak, setEditBreak] = useState(null);
  const [duplicateBreak, setDuplicateBreak] = useState(null);
  const upd = (day, patch) => onChange({ ...data, days: { ...ds, [day]: { ...ds[day], ...patch } } });

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
        <div style={{ padding: "20px 20px 0" }}>
          <Label>Lesson Duration (minutes)</Label>
          <input
            type="number" min={20} max={60}
            value={lessonDuration}
            onChange={e => {
              const raw = Number(e.target.value);
              onChange({ ...data, lessonDuration: isNaN(raw) ? 20 : Math.min(60, Math.max(20, raw)) });
            }}
            style={{ ...inputBase, maxWidth: 180 }}
          />
          <p style={{ margin: "5px 0 0", fontSize: 12.5, color: "#9ca3af" }}>Between 20 and 60 minutes</p>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", paddingLeft: 4, marginTop: 16 }}>
          {[["regular", "Regular School Day"], ["holiday", "Holiday"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", padding: "13px 18px", fontSize: 14, fontWeight: 500, color: tab === k ? "#3b82f6" : "#6b7280", borderBottom: tab === k ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -1, display: "flex", alignItems: "center", gap: 6 }}>
              {l}
              {k === "holiday" && holidays.length > 0 && (
                <span style={{ background: "#3b82f6", color: "white", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{holidays.length}</span>
              )}
            </button>
          ))}
        </div>

        {tab === "regular" && (
          <div style={{ padding: "0 20px", maxHeight: 420, overflowY: "auto" }}>
            {DAYS.map((day, i) => {
              const d = ds[day];
              return (
                <div key={day} style={{ paddingTop: 16, paddingBottom: 16, borderBottom: i < DAYS.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: d.on ? 14 : 0 }}>
                    <Toggle on={d.on} onChange={v => upd(day, { on: v })} />
                    <span style={{ fontSize: 14.5, fontWeight: d.on ? 600 : 400, color: d.on ? "#111827" : "#6b7280" }}>{day}</span>
                  </div>
                  {d.on && (
                    <div style={{ marginLeft: 52 }}>
                      <div style={{ display: "flex", gap: 28, marginBottom: 16 }}>
                        <TimeRange label="From" time={d.from} onChange={v => upd(day, { from: v })} />
                        <TimeRange label="To" time={d.to} onChange={v => upd(day, { to: v })} />
                      </div>
                      <p style={{ margin: "0 0 8px", fontSize: 13.5, fontWeight: 600, color: "#374151" }}>Break Time</p>
                      {d.breaks.length > 0 && (
                        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", background: "#f9fafb", padding: "8px 14px", borderBottom: "1px solid #e5e7eb" }}>
                            {["Name", "From", "To", ""].map((h, hi) => (
                              <span key={hi} style={{ fontSize: 11.5, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>
                            ))}
                          </div>
                          {d.breaks.map((b, bi) => (
                            <div key={bi} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 80px", padding: "10px 14px", alignItems: "center", borderBottom: bi < d.breaks.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                              <span style={{ fontSize: 13.5, color: "#111827" }}>{b.name}</span>
                              <span style={{ fontSize: 13.5, color: "#374151" }}>{b.from}</span>
                              <span style={{ fontSize: 13.5, color: "#374151" }}>{b.to}</span>
                              <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                                <button title="Duplicate to other days" onClick={() => setDuplicateBreak({ day, brk: b })} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><CopyIcon /></button>
                                <button onClick={() => upd(day, { breaks: d.breaks.filter((_, j) => j !== bi) })} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><TrashIcon /></button>
                                <button onClick={() => setEditBreak({ day, index: bi })} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex" }}><PencilIcon /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <p style={{ margin: "10px 0 6px", fontSize: 13.5, fontWeight: 600, color: "#374151" }}>Available Lessons</p>
                      <div style={{ marginBottom: 10 }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                          <thead><tr style={{ background: "#f3f4f6" }}><th style={th}>Type</th><th style={th}>From</th><th style={th}>To</th></tr></thead>
                          <tbody>
                            {generateTimeline(d, lessonDuration).map((row, ri) => (
                              <tr key={ri} style={{ background: row.type === "break" ? "#fef3c7" : "white" }}>
                                <td style={td}>{row.type === "break" ? "Break" : "Lesson"}</td>
                                <td style={td}>{row.from}</td>
                                <td style={td}>{row.to}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <button onClick={() => setEditBreak({ day, index: -1 })} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "1.5px solid #3b82f6", borderRadius: 20, padding: "5px 16px", background: "white", color: "#3b82f6", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                        <PlusIcon /> Add Break
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === "holiday" && (
          <HolidaySection
            holidays={holidays}
            onAdd={h => onChange({ ...data, holidays: [...holidays, h] })}
            onEdit={(i, h) => onChange({ ...data, holidays: holidays.map((item, idx) => idx === i ? h : item) })}
            onDelete={i => onChange({ ...data, holidays: holidays.filter((_, idx) => idx !== i) })}
          />
        )}
      </div>

      {editBreak && (
        <BreakEditModal
          brk={editBreak.index === -1 ? { name: "", from: "10.00 AM", to: "10.30 AM" } : ds[editBreak.day].breaks[editBreak.index]}
          title={editBreak.index === -1 ? "Add Break" : "Edit Break"}
          onSave={(updated) => {
            if (editBreak.index === -1) upd(editBreak.day, { breaks: [...ds[editBreak.day].breaks, updated] });
            else upd(editBreak.day, { breaks: ds[editBreak.day].breaks.map((b, i) => i === editBreak.index ? updated : b) });
          }}
          onClose={() => setEditBreak(null)}
        />
      )}
      {duplicateBreak && (
        <DuplicateBreakModal
          brk={duplicateBreak.brk}
          sourceDay={duplicateBreak.day}
          activeDays={DAYS.filter(d => ds[d].on)}
          onDuplicate={(targetDays) => {
            const next = { ...ds };
            targetDays.forEach(d => { next[d] = { ...next[d], breaks: [...next[d].breaks, { ...duplicateBreak.brk }] }; });
            onChange({ ...data, days: next });
          }}
          onClose={() => setDuplicateBreak(null)}
        />
      )}
    </>
  );
}

/* ─── Step 3: Preview helpers ────────────────────────────── */
function PreviewSection({ label, children, onEdit }) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, background: "white", marginBottom: 18, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
        <button onClick={onEdit} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 12px", fontSize: 12.5, fontWeight: 600, color: "#3b82f6", cursor: "pointer", fontFamily: "inherit" }}>
          <EditJumpIcon /> Edit
        </button>
      </div>
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 9, alignItems: "flex-start" }}>
      <span style={{ fontSize: 13, color: "#9ca3af", minWidth: 130, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13.5, color: value ? "#111827" : "#d1d5db", fontWeight: value ? 500 : 400, fontStyle: value ? "normal" : "italic" }}>{value || "Not set"}</span>
    </div>
  );
}

function Tag({ children, bg = "#eff6ff", color = "#1d4ed8", border = "#bfdbfe" }) {
  return (
    <span style={{ display: "inline-block", background: bg, color, border: `1px solid ${border}`, borderRadius: 20, padding: "3px 10px", fontSize: 12.5, fontWeight: 500, marginRight: 5, marginBottom: 5 }}>
      {children}
    </span>
  );
}

/* ─── Step 3: Preview ────────────────────────────────────── */
function Preview({ basicData, hoursData, onEditStep }) {
  const { sub, edu, grades, subjects, startDate, endDate } = basicData;
  const { lessonDuration, days, holidays } = hoursData;
  const activeDays = DAYS.filter(d => days[d].on);
  const totalLessons = activeDays.reduce((sum, d) => sum + generateTimeline(days[d], lessonDuration).filter(r => r.type === "lesson").length, 0);
  const totalBreaks = activeDays.reduce((sum, d) => sum + days[d].breaks.length, 0);

  const fmtDate = (d) => {
    if (!d) return null;
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <>
      {/* Page header */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #1960ae, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckIcon size={17} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>Preview</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>Review all settings before saving the program</p>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            { icon: <BookIcon color="#1960ae" size={16} />, label: "Active Days", value: `${activeDays.length}/week`, bg: "#eff6ff", border: "#bfdbfe", vc: "#1d4ed8" },
            { icon: <ClockIcon color="#059669" size={16} />, label: "Lessons / Week", value: String(totalLessons), bg: "#ecfdf5", border: "#a7f3d0", vc: "#065f46" },
            { icon: <SunIcon color="#d97706" size={16} />, label: "Breaks Defined", value: String(totalBreaks), bg: "#fffbeb", border: "#fde68a", vc: "#92400e" },
            { icon: <SunIcon color="#7c3aed" size={16} />, label: "Holidays", value: String(holidays.length), bg: "#f5f3ff", border: "#ddd6fe", vc: "#5b21b6" },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "11px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                {s.icon}
                <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: s.vc, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 1: Basic Info */}
      <PreviewSection label="Basic Information" onEdit={() => onEditStep(1)}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 32px", marginBottom: grades.length > 0 || subjects.length > 0 ? 12 : 0 }}>
          <InfoRow label="Sub-Program" value={sub} />
          <InfoRow label="Education Level" value={edu} />
          <InfoRow label="Start Date" value={fmtDate(startDate)} />
          <InfoRow label="End Date" value={fmtDate(endDate)} />
        </div>
        {grades.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <p style={{ margin: "0 0 6px", fontSize: 12.5, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Grade Levels</p>
            {grades.map(g => <Tag key={g}>{g}</Tag>)}
          </div>
        )}
        {subjects.length > 0 && (
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 12.5, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Subjects</p>
            {subjects.map(s => <Tag key={s} bg="#f0fdf4" color="#166534" border="#bbf7d0">{s}</Tag>)}
          </div>
        )}
        {grades.length === 0 && subjects.length === 0 && (
          <p style={{ margin: 0, fontSize: 13, color: "#d1d5db", fontStyle: "italic" }}>No grades or subjects added.</p>
        )}
      </PreviewSection>

      {/* Section 2: Weekly schedule */}
      <PreviewSection label="Weekly Schedule" onEdit={() => onEditStep(2)}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <ClockIcon color="#9ca3af" size={13} />
          <span style={{ fontSize: 13, color: "#6b7280" }}>Lesson duration: <strong style={{ color: "#111827" }}>{lessonDuration} min</strong></span>
        </div>

        {activeDays.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13.5, color: "#9ca3af", fontStyle: "italic" }}>No active days configured.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activeDays.map(day => {
              const d = days[day];
              const timeline = generateTimeline(d, lessonDuration);
              const lessonCount = timeline.filter(r => r.type === "lesson").length;
              const breakCount = timeline.filter(r => r.type === "break").length;
              return (
                <div key={day} style={{ border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                  {/* Day header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 14px", background: "#f8fafc", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b82f6" }} />
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{day}</span>
                      <span style={{ fontSize: 12.5, color: "#9ca3af" }}>{fmtTimeObj(d.from)} – {fmtTimeObj(d.to)}</span>
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, background: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: 20, padding: "2px 9px" }}>{lessonCount} lesson{lessonCount !== 1 ? "s" : ""}</span>
                      {breakCount > 0 && <span style={{ fontSize: 11.5, fontWeight: 600, background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a", borderRadius: 20, padding: "2px 9px" }}>{breakCount} break{breakCount !== 1 ? "s" : ""}</span>}
                    </div>
                  </div>
                  {/* Timeline pills */}
                  <div style={{ padding: "10px 14px", display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {timeline.map((row, ri) => (
                      <div key={ri} style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        background: row.type === "break" ? "#fef3c7" : "#f0f9ff",
                        border: `1px solid ${row.type === "break" ? "#fde68a" : "#bae6fd"}`,
                        borderRadius: 6, padding: "4px 9px", fontSize: 12, fontWeight: 500,
                        color: row.type === "break" ? "#92400e" : "#0369a1",
                      }}>
                        {row.type === "break" ? <SunIcon color="#d97706" size={11} /> : <BookIcon color="#0369a1" size={11} />}
                        <span>{row.from} – {row.to}</span>
                      </div>
                    ))}
                    {timeline.length === 0 && <span style={{ fontSize: 13, color: "#9ca3af", fontStyle: "italic" }}>No lessons fit in this window</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Inactive days summary */}
        {DAYS.filter(d => !days[d].on).length > 0 && (
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, color: "#9ca3af" }}>Off days:</span>
            {DAYS.filter(d => !days[d].on).map(d => (
              <span key={d} style={{ fontSize: 12, color: "#9ca3af", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 20, padding: "2px 9px" }}>{d}</span>
            ))}
          </div>
        )}
      </PreviewSection>

      {/* Section 3: Holidays */}
      <PreviewSection label="Holidays" onEdit={() => onEditStep(2)}>
        {holidays.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SunIcon color="#d1d5db" size={15} />
            <p style={{ margin: 0, fontSize: 13.5, color: "#9ca3af", fontStyle: "italic" }}>No holidays defined.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {holidays.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <SunIcon color="#d97706" size={14} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "#92400e" }}>{h.name}</span>
                  {h.recurring && <span style={{ fontSize: 11, fontWeight: 600, background: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: 20, padding: "1px 7px" }}>Recurring</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <CalendarIcon color="#d97706" />
                  <span style={{ fontSize: 12.5, color: "#b45309" }}>
                    {fmtDate(h.startDate)}{h.endDate && h.endDate !== h.startDate ? ` – ${fmtDate(h.endDate)}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PreviewSection>

      {/* Save CTA */}
      <div style={{ background: "linear-gradient(135deg, #1960ae 0%, #2563eb 100%)", borderRadius: 12, padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <div>
          <p style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 700, color: "white" }}>Everything looks good?</p>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Save the program to continue to the next setup stage.</p>
        </div>
        <button style={{ border: "none", borderRadius: 24, padding: "11px 26px", background: "white", fontSize: 14, fontWeight: 700, color: "#1960ae", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 14px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          Save Program <ArrowRight />
        </button>
      </div>
    </>
  );
}

/* ─── Sidebar ────────────────────────────────────────────── */
function Sidebar({ step, done, onGoTo }) {
  const items = [
    { id: 1, stepLabel: "Step 1/3", title: "Basic Information" },
    { id: 2, stepLabel: "Step 2/3", title: "Business Hours" },
    { id: 3, stepLabel: "Step 3/3", title: "Preview" },
  ];
  return (
    <div style={{ width: 252, flexShrink: 0, borderRight: "1px solid #e5e7eb", background: "white", padding: "40px 0 24px" }}>
      {items.map(item => {
        const active = item.id === step;
        const complete = done.includes(item.id);
        const reachable = item.id <= Math.max(...done, step);
        return (
          <div key={item.id} onClick={() => reachable && onGoTo(item.id)} style={{ position: "relative", padding: "7px 28px 7px 34px", marginBottom: 14, cursor: reachable ? "pointer" : "default" }}>
            {active && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#3b82f6", borderRadius: "0 3px 3px 0" }} />}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: active ? "#3b82f6" : "#9ca3af" }}>{item.stepLabel}</span>
              {complete && !active && (
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#22c55e", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <CheckIcon />
                </span>
              )}
            </div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#111827" : reachable ? "#374151" : "#c4c9d4" }}>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────── */
const initBasic = { sub: "", edu: "", grades: [], subjects: ["Mathematics", "English"], startDate: "", endDate: "" };
const initHours = {
  lessonDuration: 40,
  days: Object.fromEntries(DAYS.map((d, i) => [d, {
    on: i < 5,
    from: { h: "08", m: "30", ap: "AM" },
    to: { h: "05", m: "00", ap: "PM" },
    breaks: d === "Tuesday" ? [{ name: "Tea Break", from: "10.00 AM", to: "10.30 AM" }] : [],
  }])),
  holidays: [
    { name: "New Year's Day", startDate: "2026-01-01", endDate: "2026-01-01", recurring: true },
    { name: "Easter Break", startDate: "2026-04-18", endDate: "2026-04-21", recurring: false },
  ],
};

export default function ProgramWizard() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState([]);
  const [basicData, setBasicData] = useState(initBasic);
  const [hoursData, setHoursData] = useState(initHours);

  const next = () => { setDone(d => [...new Set([...d, step])]); setStep(s => Math.min(s + 1, 3)); };
  const back = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div style={{ 
        
    display: "flex",
     alignItems: "center", justifyContent:
      "center",
      
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <style>{`
        *{box-sizing:border-box}
        input::placeholder{color:#9ca3af}
        input:focus{border-color:#3b82f6!important;box-shadow:0 0 0 3px rgba(59,130,246,0.12)}
        button:focus{outline:none}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
      `}</style>

      <div style={{ background: "#f9fafb", borderRadius: 16,
   
         
         width: "100%",
  
          display: "flex", overflow: "hidden",
          
          minHeight: 580 }}>
        <Sidebar step={step} done={done} onGoTo={setStep} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "38px 44px 28px" }}>
            {step === 1 && <BasicInformation data={basicData} onChange={setBasicData} />}
            {step === 2 && <BusinessHours data={hoursData} onChange={setHoursData} />}
            {step === 3 && <Preview basicData={basicData} hoursData={hoursData} onEditStep={setStep} />}
          </div>

          {/* Footer nav */}
          <div style={{ padding: "16px 44px", borderTop: "1px solid #e5e7eb", background: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={back} disabled={step === 1} style={{ display: "flex", alignItems: "center", gap: 8, border: "1.5px solid #d1d5db", borderRadius: 24, padding: "9px 22px", background: "white", fontSize: 14, fontWeight: 500, color: step === 1 ? "#d1d5db" : "#374151", cursor: step === 1 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
              <ArrowLeft /> Back
            </button>
            {step < 3 && (
              <button onClick={next} style={{ display: "flex", alignItems: "center", gap: 8, border: "none", borderRadius: 24, padding: "10px 28px", background: "#1960ae", fontSize: 14, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 10px rgba(25,96,174,.4)" }}>
                Save & Continue <ArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}