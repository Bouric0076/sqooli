"use client";

import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { BreakEditModal } from "./BreakEditModal";
import { HolidayEditModal } from "./HolidayEditModal";
import {
  DaysState,
  DAYS,
  defTime,
  DayState,
  BreakEntry,
  parseTime,
  convertTimeTo24,

} from "./constants";

import { DayRow } from "./DayRow";
import { TrashIcon, PencilIcon, CopyIcon } from "./Icons";
import { Label } from "./Primitives";
import { inputBase } from "./constants";
import { DuplicateBreakModal } from "./DuplicateBreakModal";
import { buildSchedule } from "./scheduler";
import { HolidaySection } from "./HolidaySection";

interface EditBreakTarget {
  day: string;
  index: number;
}

interface EditHolidayTarget {
  index: number;
}

export interface HolidayEntry {
  name: string;
  startDate: string;
  endDate: string;
}

const initDayState = (): DaysState =>
  Object.fromEntries(
    DAYS.map((day) => [
      day,
      {
        on: false,
        from: defTime(),
        to: { h: "05", m: "00", ap: "PM" },
        breaks: [],
      },
    ])
  );

interface BusinessHoursProps {
  form: UseFormReturn<any>;
}

export const BusinessHours: FC<BusinessHoursProps> = ({ form }) => {
  const [tab, setTab] = useState<"regular" | "holiday">("regular");
  const [editBreak, setEditBreak] = useState<EditBreakTarget | null>(null);
  const [editHoliday, setEditHoliday] = useState<EditHolidayTarget | null>(null);
  const [duplicateBreak, setDuplicateBreak] = useState<any>(null);

  const ds: DaysState = form.watch("days") || initDayState();
  const holidays: HolidayEntry[] = form.watch("holidays") || [];
  const lessonDuration = form.watch("lessonDuration") || 30;

  /* ---------------- UPDATE ---------------- */
  const updateDay = (day: string, patch: Partial<DayState>) => {
    form.setValue("days", {
      ...ds,
      [day]: { ...ds[day], ...patch },
    });
  };

  /* ---------------- BREAK SAVE ---------------- */
  const handleBreakSave = (updated: BreakEntry) => {
    if (!editBreak || !editBreak.day) return;

    const { day, index } = editBreak;
    const current = ds[day]?.breaks || [];

    const newFrom = convertTimeTo24(parseTime(updated.from));
    const newTo = convertTimeTo24(parseTime(updated.to));

    if (newFrom >= newTo) {
      alert("Break start time must be before end time.");
      return;
    }

    const overlap = current.some((b, i) => {
      if (i === index) return false;
      const bFrom = convertTimeTo24(parseTime(b.from));
      const bTo = convertTimeTo24(parseTime(b.to));
      return newFrom < bTo && newTo > bFrom;
    });

    if (overlap) {
      alert("This break overlaps with another break.");
      return;
    }

    updateDay(day, {
      breaks:
        index === -1
          ? [...current, updated]
          : current.map((b, i) => (i === index ? updated : b)),
    });

    setEditBreak(null);
  };

  /* ---------------- HOLIDAYS ---------------- */
  const handleHolidaySave = (updated: HolidayEntry, index: number) => {
    if (index === -1) {
      form.setValue("holidays", [...holidays, updated]);
    } else {
      form.setValue(
        "holidays",
        holidays.map((h, i) => (i === index ? updated : h))
      );
    }
    setEditHoliday(null);
  };

  const removeHoliday = (index: number) => {
    form.setValue(
      "holidays",
      holidays.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>
            Business Hours Settings
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            Setup business hours for this program
          </p>
        </div>
      </div>

      {/* CARD */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "white",
        }}
      >
        {/* Lesson Duration */}
        <div style={{ padding: 20 }}>
          <Label>Lesson Duration (minutes)</Label>
          <input
            type="number"
            min={20}
            max={60}
            value={lessonDuration}
            onChange={(e) => {
              const val = Number(e.target.value);
              form.setValue(
                "lessonDuration",
                Math.min(60, Math.max(20, val))
              );
            }}
            style={{ ...inputBase, maxWidth: 180 }}
          />
        </div>

        {/* TABS */}
        <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", paddingLeft: 4, marginTop: 16 }}>
          {[["regular", "Regular School Day"], ["holiday", "Holiday"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", padding: "13px 18px", fontSize: 14, fontWeight: 500, color: tab === k ? "#3b82f6" : "#6b7280", borderBottom: tab === k ? "2px solid #3b82f6" : "2px solid transparent", marginBottom: -1, display: "flex", alignItems: "center", gap: 6 }}>
              {l}
              {k === "holiday" && holidays.length > 0 && (
                <span style={{ background: "#3b82f6", color: "white", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{holidays.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ padding: 20 }}>
          {tab === "regular" &&
            DAYS.map((day) => {
              const d = ds[day];

              return (
                <div key={day}>
                    <DayRow
                  day={day}
                  dayData={ds[day]}
                  onUpdate={(patch) => updateDay(day, patch)}
                  onOpenBreakModal={(index) => setEditBreak({ day, index })}
                  onDuplicateBreak={(brk) => setDuplicateBreak({ day, brk })}
                />

             
   

                  {/* TIMELINE */}
                  {d.on && (
                    <div>
                      <p style={{ margin: "10px 0", fontWeight: 600 }}>
                        Available Lessons
                      </p>

                      <table style={{ width: "100%", fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: "#f3f4f6" }}>
                            <th style={th}>Type</th>
                            <th style={th}>From</th>
                            <th style={th}>To</th>
                          </tr>
                        </thead>
                      <tbody>
                        {buildSchedule(d, lessonDuration).map((row, i) => (
                          <tr
                            key={i}
                            style={{
                              background: row.type === "break" ? "#fef3c7" : "white", // 🔥 highlight
                            }}
                          >
                      <td
                        style={{
                          ...td,
                          fontWeight: row.type === "break" ? 600 : 400,
                          color: row.type === "break" ? "#92400e" : "#111827",
                        }}
                      >
                        {row.type === "break" ? `🟡 ${row.name}`|| "Break" : "Lesson"}
                      </td>
                            <td style={td}>{row.from}</td>
                            <td style={td}>{row.to}</td>
                          </tr>
                        ))}
                      </tbody>
                      </table>
                      <hr />
                    </div>
                  )}
                </div>
              );
            })}



        {tab === "holiday" && (
        <HolidaySection
          holidays={holidays}
          onAdd={(h) => form.setValue("holidays", [...holidays, h])}
          onEdit={(i, h) =>
            form.setValue(
              "holidays",
              holidays.map((item, idx) => (idx === i ? h : item))
            )
          }
          onDelete={(i) =>
            form.setValue(
              "holidays",
              holidays.filter((_, idx) => idx !== i)
            )
          }
        />
        )}






        </div>
      </div>

      {/* MODAL */}
      {editBreak && (
        <BreakEditModal
          brk={
            editBreak.index === -1
              ? { name: "", from: "10.00 AM", to: "10.30 AM" }
              : ds[editBreak.day]?.breaks?.[editBreak.index] || {
                  name: "",
                  from: "10.00 AM",
                  to: "10.30 AM",
                }
          }
          allBreaks={ds[editBreak.day]?.breaks || []}
          title={editBreak.index === -1 ? "Add Break" : "Edit Break"}
          onSave={handleBreakSave}
          onClose={() => setEditBreak(null)}
        />
      )}

      {/* DUPLICATE */}
      {duplicateBreak && (
        <DuplicateBreakModal
          brk={duplicateBreak.brk}
          sourceDay={duplicateBreak.day}
          activeDays={DAYS.filter((d) => ds[d].on)}
          onDuplicate={(targetDays) => {
            const next = { ...ds };
            targetDays.forEach((d) => {
              next[d].breaks.push({ ...duplicateBreak.brk });
            });
            form.setValue("days", next);
          }}
          onClose={() => setDuplicateBreak(null)}
        />
      )}
    </>
  );
};

/* styles */
const th = {
  padding: "6px 10px",
  textAlign: "left" as const,
  fontSize: 12,
  color: "#6b7280",
};

const td = {
  padding: "6px 10px",
};