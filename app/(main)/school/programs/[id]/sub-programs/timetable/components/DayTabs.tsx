import { useRef, useEffect } from "react";

export function DayTabs({ days, activeDay, onSelect }) {
  const ref = useRef(null);
  useEffect(() => {
    const idx = days?.findIndex((d) => d.key === activeDay);
    ref.current?.children[idx]?.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
  }, [activeDay, days]);

  return (
    <div ref={ref} style={{
      display: "flex", overflowX: "auto", gap: 8, padding: "10px 16px",
      scrollbarWidth: "none", background: "white", borderBottom: "1px solid #eee",
    }}>
      {days?.map((day) => {
        const active = day.key === activeDay;
        return (
          <button key={day.key} onClick={() => onSelect(day.key)} style={{
            flexShrink: 0, padding: "7px 13px", borderRadius: 99, border: "none",
            background: active ? day.color : "#f0f2f7",
            color: active ? "white" : "#555",
            fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 11,
            cursor: "pointer", transition: "all 0.2s",
          }}>
            {day.label}
          </button>
        );
      })}
    </div>
  );
}