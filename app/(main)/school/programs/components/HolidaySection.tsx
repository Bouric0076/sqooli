import { PlusIcon, SunIcon, TrashIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { HolidayEditModal } from "./HolidayEditModal";

/* ─── Holiday Section ────────────────────────────────────── */
export const  HolidaySection = ({ holidays, onAdd, onEdit, onDelete }) => {
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