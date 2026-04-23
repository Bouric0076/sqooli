import { useState } from "react";

export function EditModal({ editTarget, onClose, onSave, isMobile }) {
  const [form, setForm] = useState({ ...editTarget.data });
  const handleChange = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        zIndex: 1000, padding: isMobile ? 0 : 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: isMobile ? "20px 20px 0 0" : 16,
          padding: isMobile ? "20px 20px 36px" : 28,
          width: isMobile ? "100%" : 380,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {isMobile && (
          <div style={{ width: 40, height: 4, background: "#ddd", borderRadius: 99, margin: "0 auto 20px" }} />
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: editTarget.day.color, flexShrink: 0 }} />
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>
            Edit — {editTarget.day.label} · {editTarget.week.label}
          </h2>
        </div>
        {[
          { label: "Subject", field: "subject" },
          { label: "Topic", field: "topic" },
          { label: "Teacher", field: "teacher" },
          { label: "Lesson ID", field: "lessonId" },
          { label: "Join URL", field: "joinUrl" },
        ].map(({ label, field }) => (
          <div key={field} style={{ marginBottom: 14 }}>
            <label style={{
              display: "block", fontSize: 10, fontWeight: 700, color: "#888",
              marginBottom: 5, letterSpacing: 0.6, textTransform: "uppercase",
            }}>
              {label}
            </label>
            <input
              value={form[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              style={{
                width: "100%", padding: "10px 12px",
                border: "1.5px solid #e0e0e0", borderRadius: 10,
                fontSize: 14, outline: "none",
                fontFamily: "'DM Sans', sans-serif", WebkitAppearance: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = editTarget.day.color)}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", border: "1.5px solid #ddd", borderRadius: 10,
            background: "white", fontSize: 14, fontWeight: 600, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{
            flex: 1, padding: "12px", border: "none", borderRadius: 10,
            background: editTarget.day.color, color: "white",
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}