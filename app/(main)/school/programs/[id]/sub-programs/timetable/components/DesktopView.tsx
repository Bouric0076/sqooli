import { TIME_SLOTS, WEEKS } from "../page";
import { ClassCard } from "./ClassCard";

export function DesktopView({ schedule, onEdit, activeWeek, onWeekChange }) {
  const week = WEEKS.find((w) => w.id === activeWeek);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f0f2f7", minHeight: "100vh", padding: 24 }}>

      {/* Week navigation header */}
      <div style={{
        background: "white", borderRadius: 16, padding: "14px 20px",
        marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: 1 }}>
            TIMETABLE
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, color: "#1a1a2e" }}>
            {week.label} &nbsp;
            <span style={{ fontWeight: 400, fontSize: 13, color: "#888" }}>
              {week.days[0].date} – {week.days[6].date}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Prev arrow */}
          <button
            onClick={() => { const i = WEEKS.findIndex(w => w.id === activeWeek); if (i > 0) onWeekChange(WEEKS[i-1].id); }}
            disabled={WEEKS.findIndex(w => w.id === activeWeek) === 0}
            style={{
              width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e0e0e0",
              background: "white", fontSize: 20, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: WEEKS.findIndex(w => w.id === activeWeek) === 0 ? "#ccc" : "#333",
            }}
          >‹</button>

          {/* Week pills */}
          {WEEKS.map((w) => {
            const active = w.id === activeWeek;
            return (
              <button key={w.id} onClick={() => onWeekChange(w.id)} style={{
                padding: "7px 16px", borderRadius: 99, border: "none",
                background: active ? "#1a1a2e" : "#f0f2f7",
                color: active ? "white" : "#555",
                fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 12,
                cursor: "pointer", transition: "all 0.2s",
              }}>{w.label}</button>
            );
          })}

          {/* Next arrow */}
          <button
            onClick={() => { const i = WEEKS.findIndex(w => w.id === activeWeek); if (i < WEEKS.length-1) onWeekChange(WEEKS[i+1].id); }}
            disabled={WEEKS.findIndex(w => w.id === activeWeek) === WEEKS.length - 1}
            style={{
              width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e0e0e0",
              background: "white", fontSize: 20, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: WEEKS.findIndex(w => w.id === activeWeek) === WEEKS.length-1 ? "#ccc" : "#333",
            }}
          >›</button>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        background: "white", borderRadius: 20,
        overflow: "auto", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", fontSize: 12,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "110px repeat(7, minmax(110px, 1fr))",
          minWidth: 900,
        }}>
          {/* Header */}
          <div style={{
            background: "white", padding: "16px 12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, color: "#555", fontSize: 11, letterSpacing: 0.5,
            borderBottom: "2px solid #eee",
          }}>Date / Time</div>

          {week.days.map((day) => (
            <div key={day.key} style={{
              background: day.color, padding: "14px 8px",
              textAlign: "center", color: "white",
              borderBottom: "2px solid rgba(255,255,255,0.2)",
            }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>
                {day.label}
              </div>
              <div style={{ fontSize: 10, fontWeight: 500, opacity: 0.85, marginTop: 2 }}>{day.date}</div>
            </div>
          ))}

          {/* Rows */}
          {TIME_SLOTS.map((slot) => {
            if (slot.isBreak) {
              const isTea = slot.style === "tea";
              return (
                <div key={slot.id} style={{
                  gridColumn: "1 / -1", textAlign: "center", padding: "11px",
                  fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 1,
                  background: isTea ? "#fff8e8" : "#e8f8f0",
                  color: isTea ? "#b37700" : "#1a8a50",
                  borderBottom: "1px solid #eee",
                }}>{slot.label}</div>
              );
            }

            return (
              <>
                <div key={`label_${slot.id}`} style={{
                  background: "#fafafa", padding: "10px 8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textAlign: "center", fontWeight: 700, fontSize: 10.5, color: "#444",
                  lineHeight: 1.4, borderBottom: "1px solid #eee", borderRight: "2px solid #eee",
                }}>
                  {slot.label}
                </div>
                {week.days.map((day) => {
                  const key = `${activeWeek}_${slot.id}_${day.key}`;
                  return (
                    <div key={key} style={{
                      padding: "8px 7px",
                      borderBottom: "1px solid #eee", borderRight: "1px solid #eee",
                    }}>
                      <ClassCard
                        data={schedule[key]}
                        day={day}
                        onEdit={() => onEdit(activeWeek, slot.id, day, schedule[key])}
                      />
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: "#aaa" }}>
        Hover &amp; click any class card to edit · Use arrows or week pills to switch weeks
      </p>
    </div>
  );
}