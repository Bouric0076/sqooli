"use client";

import { useState, FC } from "react";
import { XIcon } from "./Icons";
import { Label, Spinner } from "./Primitives";
import {
  BreakEntry,
  TimeValue,
  parseTime,
  fmtTime,
  inputBase,
  HH,
  MM,
  AP,
} from "./constants";

interface BreakEditModalProps {
  brk: BreakEntry;
  allBreaks: BreakEntry[];
  title?: string;
  onSave: (updated: BreakEntry) => void;
  onClose: () => void;
}

/* ✅ SAFE NUMERIC TIME (fixes all comparison bugs) */
const toMinutes = (time: TimeValue | string): number => {
  let t: TimeValue;

  if (typeof time === "string") {
    t = parseTime(time);
  } else {
    t = time;
  }

  let hour = parseInt(t.h, 10);
  const minute = parseInt(t.m, 10);

  if (t.ap === "PM" && hour !== 12) hour += 12;
  if (t.ap === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
};

export const BreakEditModal: FC<BreakEditModalProps> = ({
  brk,
  allBreaks,
  title = "Edit Break",
  onSave,
  onClose,
}) => {
  const [name, setName] = useState<string>(brk.name);
  const [from, setFrom] = useState<TimeValue>(parseTime(brk.from));
  const [to, setTo] = useState<TimeValue>(parseTime(brk.to));

  const handleSave = () => {
    const newFrom = toMinutes(from);
    const newTo = toMinutes(to);

    /* ✅ FIX: reliable time validation */
    if (newFrom >= newTo) {
      alert("Break start time must be before end time.");
      return;
    }

    /* ✅ FIX: reliable overlap detection */
    const overlap = allBreaks.some((b) => {
      if (b === brk) return false;

      const bFrom = toMinutes(b.from);
      const bTo = toMinutes(b.to);

      return newFrom < bTo && newTo > bFrom;
    });

    if (overlap) {
      alert("This break overlaps with another break.");
      return;
    }

    onSave({
      name: name.trim() || "Break",
      from: fmtTime(from),
      to: fmtTime(to),
    });

    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          padding: "28px 28px 24px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <h3
            style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <XIcon />
          </button>
        </div>

        {/* Break Name */}
        <div style={{ marginBottom: 20 }}>
          <Label>Break Name</Label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tea Break"
            style={inputBase}
          />
        </div>

        {/* From / To */}
        <div style={{ display: "flex", gap: 20, marginBottom: 26 }}>
          <div style={{ flex: 1 }}>
            <Label>From</Label>
            <div style={{ display: "flex", gap: 4 }}>
              <Spinner value={from.h} options={HH} onChange={(v) => setFrom((f) => ({ ...f, h: v }))} />
              <Spinner value={from.m} options={MM} onChange={(v) => setFrom((f) => ({ ...f, m: v }))} />
              <Spinner value={from.ap} options={AP} onChange={(v) => setFrom((f) => ({ ...f, ap: v }))} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Label>To</Label>
            <div style={{ display: "flex", gap: 4 }}>
              <Spinner value={to.h} options={HH} onChange={(v) => setTo((t) => ({ ...t, h: v }))} />
              <Spinner value={to.m} options={MM} onChange={(v) => setTo((t) => ({ ...t, m: v }))} />
              <Spinner value={to.ap} options={AP} onChange={(v) => setTo((t) => ({ ...t, ap: v }))} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              border: "1.5px solid #d1d5db",
              borderRadius: 24,
              padding: "8px 20px",
              background: "white",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              border: "none",
              borderRadius: 24,
              padding: "8px 22px",
              background: "#1960ae",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(25,96,174,.35)",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};