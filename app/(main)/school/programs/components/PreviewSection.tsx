import { EditJumpIcon } from "./Icons";

export const PreviewSection = ({ label, children, onEdit }) => {
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
