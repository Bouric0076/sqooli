import { CopyIcon, XIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

export const DuplicateBreakModal = ({ brk, sourceDay, activeDays, onDuplicate, onClose }) => {
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
