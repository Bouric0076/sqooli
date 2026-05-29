import { useState } from "react";

export function HolidayCard({ data, day, onEdit }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    //   onClick={onEdit}
      style={{
        background: day.light, borderLeft: `3px solid ${day.color}`,
        borderRadius: 8, padding: "8px 9px", minHeight: 90,
        display: "flex", flexDirection: "column", gap: 2,
        transition: "box-shadow 0.2s, transform 0.15s",
        boxShadow: hovered ? `0 4px 14px rgba(0,0,0,0.1)` : "none",
        transform: hovered ? "translateY(-1px)" : "none",
        cursor: "pointer", position: "relative",
      }}
    >
   ☕ {data?.label} 
      {/* {hovered && (
        <div style={{
          position: "absolute", top: 6, right: 6,
          background: day.color, color: "white",
          borderRadius: 4, fontSize: 8, padding: "2px 5px", fontWeight: 700,
        }}>EDIT</div>
      )} */}
    </div>
  );
}