export function WeekNavigator({ activeWeek, weeks, onChange }) {
  const idx = weeks.findIndex((w) => w.id === activeWeek);
  const week = weeks[idx];

  // Date range label e.g. "05 Jan – 11 Jan 2026"
  const start = week.days[0].date;
  const end = week.days[6].date;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", background: "white",
      borderBottom: "1px solid #eee", gap: 8,
    }}>
      {/* Prev */}
      <button
        onClick={() => idx > 0 && onChange(weeks[idx - 1].id)}
        disabled={idx === 0}
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e0e0e0",
          background: idx === 0 ? "#f5f5f5" : "white",
          color: idx === 0 ? "#ccc" : "#333",
          fontSize: 18, cursor: idx === 0 ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.15s",
        }}
      >
        ‹
      </button>

      {/* Week pills */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none" }}>
        {weeks.map((w, i) => {
          const active = w.id === activeWeek;
          return (
            <button
              key={w.id}
              onClick={() => onChange(w.id)}
              style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 99,
                border: "none",
                background: active ? "#1a1a2e" : "#f0f2f7",
                color: active ? "white" : "#555",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700, fontSize: 11,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {w.label}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => idx < weeks.length - 1 && onChange(weeks[idx + 1].id)}
        disabled={idx === weeks.length - 1}
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e0e0e0",
          background: idx === weeks.length - 1 ? "#f5f5f5" : "white",
          color: idx === weeks.length - 1 ? "#ccc" : "#333",
          fontSize: 18, cursor: idx === weeks.length - 1 ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all 0.15s",
        }}
      >
        ›
      </button>
    </div>
  );
}