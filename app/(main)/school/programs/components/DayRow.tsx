"use client";

import type { FC } from "react";

import { Toggle, TimeRange } from "./Primitives";
import { PlusIcon, PencilIcon, TrashIcon, CopyIcon } from "./Icons";
import { BreakEntry, DayState } from "./constants";

interface DayRowProps {
  day: string;
  dayData: DayState;
  onUpdate: (patch: Partial<DayState>) => void;
  onOpenBreakModal: (index: number) => void;
  onDuplicateBreak: (brk: BreakEntry) => void; // ✅ NEW
}

export const DayRow: FC<DayRowProps> = ({
  day,
  dayData,
  onUpdate,
  onOpenBreakModal,
  onDuplicateBreak,
}) => {
  const { on, from, to, breaks } = dayData;

  const removeBreak = (index: number) =>
    onUpdate({ breaks: breaks.filter((_, i) => i !== index) });

  return (
    <div
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: on ? 14 : 0,
        }}
      >
        <Toggle on={on} onChange={(v) => onUpdate({ on: v })} />
        <span
          style={{
            fontSize: 14.5,
            fontWeight: on ? 600 : 400,
            color: on ? "#111827" : "#6b7280",
          }}
        >
          {day}
        </span>
      </div>

      {on && (
        <div style={{ marginLeft: 52 }}>
          {/* FROM / TO */}
          <div style={{ display: "flex", gap: 28, marginBottom: 16 }}>
            <TimeRange
              label="From"
              time={from}
              onChange={(v) => onUpdate({ from: v })}
            />
            <TimeRange
              label="To"
              time={to}
              onChange={(v) => onUpdate({ to: v })}
            />
          </div>

          {/* BREAKS */}
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 13.5,
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Break Time
          </p>

          {breaks.length > 0 && (
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 80px",
                  background: "#f9fafb",
                  padding: "8px 14px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {(["Name", "From", "To", ""] as const).map((h, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* ROWS */}
              {breaks.map((b: BreakEntry, bi: number) => (
                <div
                  key={bi}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 80px",
                    padding: "10px 14px",
                    alignItems: "center",
                    borderBottom:
                      bi < breaks.length - 1
                        ? "1px solid #f3f4f6"
                        : "none",
                  }}
                >
                  <span style={{ fontSize: 13.5, color: "#111827" }}>
                    {b.name}
                  </span>
                  <span style={{ fontSize: 13.5, color: "#374151" }}>
                    {b.from}
                  </span>
                  <span style={{ fontSize: 13.5, color: "#374151" }}>
                    {b.to}
                  </span>

                  {/* ✅ ACTION BUTTONS */}
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* COPY */}
                    <button
                      onClick={() => onDuplicateBreak(b)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CopyIcon />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => removeBreak(bi)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TrashIcon />
                    </button>

                    {/* EDIT */}
                    <button
                      onClick={() => onOpenBreakModal(bi)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 2,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <PencilIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD BREAK */}
          <button
            onClick={() => onOpenBreakModal(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              border: "1.5px solid #3b82f6",
              borderRadius: 20,
              padding: "5px 16px",
              background: "white",
              color: "#3b82f6",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <PlusIcon /> Add Break
          </button>
        </div>
      )}
    </div>
  );
};