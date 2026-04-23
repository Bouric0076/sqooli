import { useState, useRef } from "react";
import { TIME_SLOTS, WEEKS } from "../page";
import { DayTabs } from "./DayTabs";
import { WeekNavigator } from "./WeekNavigator";

export function MobileView({ schedule, onEdit, activeWeek, onWeekChange }) {
  const [activeDayKey, setActiveDayKey] = useState("mon");
  const touchStart = useRef(null);

  const week = WEEKS.find((w) => w.id === activeWeek);
  const day = week.days.find((d) => d.key === activeDayKey);

  const handleTouchStart = (e) => (touchStart.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;
    const idx = week.days.findIndex((d) => d.key === activeDayKey);
    if (diff > 0 && idx < week.days.length - 1) setActiveDayKey(week.days[idx + 1].key);
    if (diff < 0 && idx > 0) setActiveDayKey(week.days[idx - 1].key);
    touchStart.current = null;
  };

  return (
    <div style={{ background: "#f0f2f7", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ background: day.color, padding: "20px 16px 16px", color: "white" }}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 600, opacity: 0.8, letterSpacing: 1, marginBottom: 4 }}>
          WEEKLY TIMETABLE · {week.label.toUpperCase()}
        </div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: 1 }}>
          {day.label}{" "}
          <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.8 }}>{day.date}</span>
        </div>
      </div>

      {/* Week navigator */}
      <WeekNavigator activeWeek={activeWeek} onChange={onWeekChange} />

      {/* Day tabs */}
      <DayTabs days={week.days} activeDay={activeDayKey} onSelect={setActiveDayKey} />

      {/* Class cards */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}
      >
        {TIME_SLOTS.map((slot) => {
          if (slot.isBreak) {
            const isTea = slot.style === "tea";
            return (
              <div key={slot.id} style={{
                textAlign: "center", padding: "10px", borderRadius: 10,
                fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700,
                background: isTea ? "#fff8e8" : "#e8f8f0",
                color: isTea ? "#b37700" : "#1a8a50", letterSpacing: 0.5,
              }}>
                {slot.label}
              </div>
            );
          }

          const key = `${activeWeek}_${slot.id}_${activeDayKey}`;
          const data = schedule[key];

          return (
            <div key={slot.id} style={{
              background: "white", borderRadius: 14, overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}>
              <div style={{
                background: day.light, borderBottom: `2px solid ${day.color}`,
                padding: "7px 14px", fontSize: 11, fontWeight: 700,
                color: day.color, letterSpacing: 0.3,
              }}>
                {slot.label}
              </div>
              <div style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 3 }}>{data.subject}</div>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>📐 {data.topic}</div>
                  <div style={{ fontSize: 12, color: "#777", marginBottom: 2 }}>👤 {data.teacher}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>ID: {data.lessonId}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                  <a href={data.joinUrl} style={{
                    background: day.color, color: "white",
                    padding: "8px 16px", borderRadius: 99,
                    fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap",
                  }}>Join Class</a>
                  <button
                    onClick={() => onEdit(activeWeek, slot.id, day, data)}
                    style={{
                      background: "transparent", border: `1px solid ${day.color}`,
                      color: day.color, padding: "5px 12px", borderRadius: 99,
                      fontSize: 11, fontWeight: 600, cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >Edit</button>
                </div>
              </div>
            </div>
          );
        })}
        <p style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 4, marginBottom: 20 }}>
          Swipe left / right to change day
        </p>
      </div>
    </div>
  );
}