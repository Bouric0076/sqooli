import type { FC, ReactNode } from "react";
import { TimeValue, HH, MM, AP } from "./constants";


export const Label: FC<{ children: ReactNode }> = ({ children }) => (
  <p style={{ margin: "0 0 6px", fontSize: 13.5, color: "#374151", fontWeight: 500 }}>{children}</p>
);

interface ToggleProps {
  on: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle: FC<ToggleProps> = ({ on, onChange }) => (
  <div
    onClick={() => onChange(!on)}
    style={{
      width: 40, height: 22, borderRadius: 11,
      background: on ? "#3b82f6" : "#d1d5db",
      position: "relative", cursor: "pointer",
      transition: "background .2s", flexShrink: 0,
    }}
  >
    <div style={{
      position: "absolute", top: 3, left: on ? 21 : 3,
      width: 16, height: 16, borderRadius: "50%",
      background: "white", transition: "left .2s",
      boxShadow: "0 1px 3px rgba(0,0,0,.2)",
    }} />
  </div>
);

interface SpinnerProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const Spinner: FC<SpinnerProps> = ({ value, options, onChange }) => {
  const idx = options.indexOf(value);
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: 6, overflow: "hidden", background: "white" }}>
      <span style={{ padding: "7px 10px", fontSize: 14, color: "#111827", minWidth: 40, textAlign: "center" }}>{value}</span>
      <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid #e5e7eb" }}>
        <button
          onClick={() => onChange(options[(idx - 1 + options.length) % options.length])}
          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px 6px", color: "#6b7280", fontSize: 9, lineHeight: 1.2 }}
        >▲</button>
        <button
          onClick={() => onChange(options[(idx + 1) % options.length])}
          style={{ border: "none", background: "none", cursor: "pointer", padding: "2px 6px", color: "#6b7280", fontSize: 9, lineHeight: 1.2 }}
        >▼</button>
      </div>
    </div>
  );
};

interface TimeRangeProps {
  label: string;
  time: TimeValue;
  onChange: (value: TimeValue) => void;
}

export const TimeRange: FC<TimeRangeProps> = ({ label, time, onChange }) => (
  <div>
    <p style={{ margin: "0 0 5px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{label}</p>
    <div style={{ display: "flex", gap: 4 }}>
      <Spinner value={time.h}  options={HH} onChange={v => onChange({ ...time, h: v })} />
      <Spinner value={time.m}  options={MM} onChange={v => onChange({ ...time, m: v })} />
      <Spinner value={time.ap} options={AP} onChange={v => onChange({ ...time, ap: v })} />
    </div>
  </div>
);
