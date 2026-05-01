import React, { useMemo } from "react";
import { ClassCard } from "./ClassCard";
import { BreakCard } from "./BreakCard";

export function DesktopView({
  weeks = [],
  onEdit,
  activeWeek,
  onWeekChange,
}) {
  const week = weeks.find((w) => w.id === activeWeek);

  // 🔥 convert API days/items → UI format (NO UI CHANGE)
const { timeSlots, schedule } = useMemo(() => {
  if (!week) return { timeSlots: [], schedule: {} };

  const slotsMap = new Map();
  const scheduleMap = {};

  week.days.forEach((day) => {
    day.items.forEach((item) => {
      const slotId = `${item.start}-${item.end}`; // ✅ FIXED UNIQUE KEY

      // build proper label (THIS FIXES YOUR ISSUE)
      const label = `${item.start} - ${item.end}`;

      if (!slotsMap.has(slotId)) {
        slotsMap.set(slotId, {
          id: slotId,
          label,
          isBreak: item.type === "break",
          style: item.label?.toLowerCase()?.includes("tea")
            ? "tea"
            : item.label?.toLowerCase()?.includes("lunch")
            ? "lunch"
            : null,
        });
      }

      const key = `${week.id}_${slotId}_${day.key}`;

      scheduleMap[key] = {
        subject: item.subject,
        topic: item.topic,
        teacher: item.teacher,
        lessonId: item.lessonId,
        joinUrl: item.joinUrl,
        type: item.type,
        start: item.start,
        end: item.end,
        label: item.label,
      };
    });
  });

  return {
    timeSlots: Array.from(slotsMap.values()).sort((a, b) =>
      a.id.localeCompare(b.id)
    ),
    schedule: scheduleMap,
  };
}, [week]);

  if (!week) {
    return <div style={{ padding: 40 }}>Loading timetable...</div>;
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f0f2f7", minHeight: "100vh", padding: 24 }}>

      {/* Week navigation header (UNCHANGED) */}
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "14px 20px",
        marginBottom: 16,
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: 1 }}>
            TIMETABLE
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>
            {week?.label} &nbsp;
            <span style={{ fontWeight: 400, fontSize: 13, color: "#888" }}>
              {week?.days[0].date} – {week?.days[6].date}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => {
              const i = weeks.findIndex(w => w.id === activeWeek);
              if (i > 0) onWeekChange(weeks[i - 1].id);
            }}
            disabled={weeks.findIndex(w => w.id === activeWeek) === 0}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid #e0e0e0",
              background: "white",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >‹</button>

          {weeks.map((w) => {
            const active = w.id === activeWeek;
            return (
              <button
                key={w.id}
                onClick={() => onWeekChange(w.id)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 99,
                  border: "none",
                  background: active ? "#1a1a2e" : "#f0f2f7",
                  color: active ? "white" : "#555",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {w.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              const i = weeks.findIndex(w => w.id === activeWeek);
              if (i < weeks.length - 1) onWeekChange(weeks[i + 1].id);
            }}
            disabled={weeks.findIndex(w => w.id === activeWeek) === weeks.length - 1}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid #e0e0e0",
              background: "white",
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >›</button>
        </div>
      </div>

      {/* GRID (UNCHANGED UI STRUCTURE) */}
      <div style={{
        background: "white",
        borderRadius: 20,
        overflow: "auto",
        boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
        fontSize: 12,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "110px repeat(7, minmax(110px, 1fr))",
          minWidth: 900,
        }}>

          {/* Header */}
          <div style={{
            background: "white",
            padding: "16px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#555",
            fontSize: 11,
          }}>
            Date / Time
          </div>

          {week.days.map((day) => (
            <div key={day.key} style={{
              background: day.color,
              padding: "14px 8px",
              textAlign: "center",
              color: "white",
            }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800 }}>
                {day.label}
              </div>
              <div style={{ fontSize: 10 }}>{day.date}</div>
            </div>
          ))}

          {/* ROWS */}
          {timeSlots.map((slot) => {
            // if (slot.isBreak) {
            //   return (
            //     <div key={slot.id} style={{
            //       gridColumn: "1 / -1",
            //       textAlign: "center",
            //       padding: "11px",
            //       background: slot.style === "tea" ? "#fff8e8" : "#e8f8f0",
            //       fontWeight: 700,
            //     }}>
            //       {slot.label}
            //     </div>
            //   );
            // }

            return (
              <React.Fragment key={slot.id}>
                <div style={{
                  background: "#fafafa",
                  padding: "10px 8px",
                  fontWeight: 700,
                  fontSize: 10.5,
                }}>
                  {slot.label} 
                </div>

                {week.days.map((day) => {
                  const key = `${week.id}_${slot.id}_${day.key}`;
                  const data = schedule[key];

                  return (
                    <div
                      key={key}
                      style={{
                        padding: "8px 7px",
                        border: "1px solid #eee",
                      }}
                    >
       {data?.type =="break" ? (
  <BreakCard
    data={data}
    day={day}
    onEdit={() => onEdit(week.id, slot.id, day, data)}
  />
 

) : data?.subject ? (
  <ClassCard
    data={data}
    day={day}
    onEdit={() => onEdit(week.id, slot.id, day, data)}
  />
) : (
  <div
    onClick={() => onEdit(week.id, slot.id, day, null)}
    style={{ color: "#aaa", cursor: "pointer" }}
  >
    Not Available
  </div>
)}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}