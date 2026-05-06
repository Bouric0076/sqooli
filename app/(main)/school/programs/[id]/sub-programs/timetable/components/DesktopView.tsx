import React, { useMemo, useState } from "react";
import { ClassCard } from "./ClassCard";
import { BreakCard } from "./BreakCard";
import { HolidayCard } from "./HolidayCard";

export function DesktopView({
  weeks = [],
  onEdit,
  onMove,
  activeWeek,
  onWeekChange,
}) {
  const [draggedItem, setDraggedItem] = useState(null);

  const week = weeks.find((w) => w.id === activeWeek);

  // ✅ ONLY allow empty slots
  const isSlotAvailable = (data) => {
    return !data;
  };

  // 🔥 convert API → UI format (UNCHANGED)
  const { timeSlots, schedule } = useMemo(() => {
    if (!week) return { timeSlots: [], schedule: {} };

    const slotsMap = new Map();
    const scheduleMap = {};

    week.days.forEach((day) => {
      day.items.forEach((item) => {
        const slotId = `${item.start}-${item.end}`;
        const label = `${item.start} - ${item.end}`;

        if (!slotsMap.has(slotId)) {
          slotsMap.set(slotId, {
            actualId: item.slotId,
            id: slotId,
            label,
          });
        }

        const key = `${week.id}_${slotId}_${day.key}`;

        scheduleMap[key] = {
          ...item,
          date: day.date,
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

  // 🔥 FIX: enforce Monday → Sunday ordering
  const sortedDays = useMemo(() => {
    if (!week?.days) return [];

    return [...week.days].sort((a, b) => {
      const getOrder = (dateStr) => {
        const d = new Date(dateStr);
        return (d.getDay() + 6) % 7; // Monday = 0 ... Sunday = 6
      };

      return getOrder(a.date) - getOrder(b.date);
    });
  }, [week]);

  if (!week) {
    return <div style={{ padding: 40 }}>Loading timetable...</div>;
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#f0f2f7",
        minHeight: "100vh",
        padding: 24,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: "14px 20px",
          marginBottom: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#999",
              letterSpacing: 1,
            }}
          >
            TIMETABLE
          </div>

          <div
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "#1a1a2e",
            }}
          >
            {week?.label} &nbsp;
            <span style={{ fontWeight: 400, fontSize: 13, color: "#888" }}>
              {week?.days[0]?.date} – {week?.days[6]?.date}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => {
              const i = weeks.findIndex((w) => w.id === activeWeek);
              if (i > 0) onWeekChange(weeks[i - 1].id);
            }}
            disabled={weeks.findIndex((w) => w.id === activeWeek) === 0}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid #e0e0e0",
              background: "white",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ‹
          </button>

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
              const i = weeks.findIndex((w) => w.id === activeWeek);
              if (i < weeks.length - 1)
                onWeekChange(weeks[i + 1].id);
            }}
            disabled={
              weeks.findIndex((w) => w.id === activeWeek) ===
              weeks.length - 1
            }
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1.5px solid #e0e0e0",
              background: "white",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* GRID */}
      <div
        style={{
          background: "white",
          borderRadius: 20,
          overflow: "auto",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
          fontSize: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "110px repeat(7, minmax(110px, 1fr))",
            minWidth: 900,
          }}
        >
          {/* HEADER */}
          <div style={{ padding: "16px 12px", fontWeight: 700 }}>
            Date / Time
          </div>

          {/* DAYS HEADER */}
          {sortedDays.map((day) => {
            const isInactiveDay = !day.isActive;

            return (
              <div
                key={day.key}
                style={{
                  background: isInactiveDay ? "#dcdcdc" : day.color,
                  padding: "14px 8px",
                  textAlign: "center",
                  color: "white",
                  opacity: isInactiveDay ? 0.5 : 1,
                }}
              >
                <div style={{ fontWeight: 800 }}>{day.label}</div>
                <div style={{ fontSize: 10 }}>{day.date}</div>
              </div>
            );
          })}

          {/* ROWS */}
          {timeSlots.map((slot) => (
            <React.Fragment key={slot.id}>
              <div style={{ padding: "10px 8px", fontWeight: 700 }}>
                {slot.label}
              </div>

              {sortedDays.map((day) => {
                const key = `${week.id}_${slot.id}_${day.key}`;
                const data = schedule[key];

                const isInactiveDay = !day.isActive;

                return (
                  <div
                    key={key}
                    style={{
                      padding: "8px 7px",
                      border: "1px solid #eee",
                      background: isInactiveDay ? "#f3f3f3" : "white",
                      opacity: isInactiveDay ? 0.5 : 1,
                      pointerEvents: isInactiveDay ? "none" : "auto",
                    }}
                    onDragOver={(e) => {
                      if (!isSlotAvailable(data)) return;
                      e.preventDefault();
                      e.currentTarget.style.background = "#f5f7ff";
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                    onDrop={() => {
                      if (!draggedItem) return;
                      if (!isSlotAvailable(data)) return;

                      const payload = {
                        from: draggedItem.from,
                        to: {
                          weekId: week.id,
                          slotId: data?.slotId || slot.actualId,
                          actualId: slot.actualId,
                          dayKey: day.key,
                          date: day.date,
                        },
                        item: draggedItem.data,
                      };

                      onMove
                        ? onMove(payload)
                        : onEdit(
                            week.id,
                            slot.id,
                            slot.actualId,
                            day,
                            draggedItem.data,
                            draggedItem.from
                          );

                      setDraggedItem(null);
                    }}
                  >
{data ? (
  <div
    draggable
    onDragStart={() =>
      setDraggedItem({
        data,
        from: {
          weekId: week.id,
          slotId: data?.slotId || slot.actualId,
          dayKey: day.key,
          date: day.date,
        },
      })
    }
  >
    {data.label === "Available" ? (
      <div
        onClick={() => onEdit(week.id, slot.id, day, data)}
        style={{ color: "#4CAF50", cursor: "pointer" }}
      >
        Available
      </div>
    ) : data.type === "holiday" ? (
      <HolidayCard
        data={data}
        day={day}
        onEdit={() => onEdit(week.id, slot.id, day, data)}
      />
    ) : data.type === "break" ? (
      <BreakCard
        data={data}
        day={day}
        onEdit={() => onEdit(week.id, slot.id, day, data)}
      />
    ) : (
      <ClassCard
        data={data}
        day={day}
        onEdit={() => onEdit(week.id, slot.id, day, data)}
      />
    )}
  </div>
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
          ))}
        </div>
      </div>
    </div>
  );
}