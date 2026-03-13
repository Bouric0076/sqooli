import { useState } from "react";
import type { FC } from "react";
import { DAYS, defTime } from "../constants";
import type { DaysState, BreakEntry, DayState } from "../constants";
import { DayRow } from "./DayRow";
import { BreakEditModal } from "./BreakEditModal";

interface EditBreakTarget {
  day: string;
  index: number;
}

const initDayState = (): DaysState =>
  Object.fromEntries(
    DAYS.map((day, i) => [
      day,
      {
        on: i < 5,
        from: defTime(),
        to: { h: "05", m: "00", ap: "PM" },
        breaks: day === "Tuesday"
          ? [{ name: "Tea Break", from: "08.30 AM", to: "17.00 PM" }]
          : [],
      } satisfies DayState,
    ])
  );

export const BusinessHours: FC = () => {
  const [tab, setTab]               = useState<string>("regular");
  const [ds, setDs]                 = useState<DaysState>(initDayState);
  const [editBreak, setEditBreak]   = useState<EditBreakTarget | null>(null);

  const updateDay = (day: string, patch: Partial<DayState>) =>
    setDs(s => ({ ...s, [day]: { ...s[day], ...patch } }));

  const handleBreakSave = (updated: BreakEntry) => {
    if (!editBreak) return;
    const { day, index } = editBreak;
    const current = ds[day].breaks;
    updateDay(day, {
      breaks: index === -1
        ? [...current, updated]
        : current.map((b, i) => (i === index ? updated : b)),
    });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111827" }}>Business Hours Settings</h2>
          <p style={{ margin: "0 0 18px", fontSize: 14, color: "#6b7280" }}>Setup business hours for this program</p>
        </div>
        <button style={{
          border: "1px solid #d1d5db", borderRadius: 8, padding: "7px 18px",
          background: "white", fontSize: 14, color: "#374151", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
        }}>Skip</button>
      </div>

      <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, background: "white", overflow: "hidden" }}>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", paddingLeft: 4 }}>
          {([["regular", "Regular School Day"], ["holiday", "Holiday"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                border: "none", background: "none", cursor: "pointer", fontFamily: "inherit",
                padding: "13px 18px", fontSize: 14, fontWeight: 500,
                color: tab === key ? "#3b82f6" : "#6b7280",
                borderBottom: tab === key ? "2px solid #3b82f6" : "2px solid transparent",
                marginBottom: -1,
              }}
            >{label}</button>
          ))}
        </div>

        {/* Day rows */}
        <div style={{ padding: "0 20px", maxHeight: 380, overflowY: "auto" }}>
          {DAYS.map(day => (
            <DayRow
              key={day}
              day={day}
              dayData={ds[day]}
              onUpdate={patch => updateDay(day, patch)}
              onOpenBreakModal={index => setEditBreak({ day, index })}
            />
          ))}
        </div>
      </div>

      {editBreak && (
        <BreakEditModal
          brk={
            editBreak.index === -1
              ? { name: "", from: "10.00 AM", to: "10.30 AM" }
              : ds[editBreak.day].breaks[editBreak.index]
          }
          title={editBreak.index === -1 ? "Add Break" : "Edit Break"}
          onSave={handleBreakSave}
          onClose={() => setEditBreak(null)}
        />
      )}
    </>
  );
};
