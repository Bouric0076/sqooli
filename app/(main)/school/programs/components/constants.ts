import type { CSSProperties } from "react";

export const inputBase: CSSProperties = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  padding: "9px 13px",
  fontSize: 14,
  color: "#111827",
  outline: "none",
  background: "white",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

export const HH: string[] = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
export const MM: string[] = ["00", "15", "30", "45"];
export const AP: string[] = ["AM", "PM"];

export const DAYS: string[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export interface WizardStep {
  id: number;
  stepLabel: string;
  title: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  { id: 1, stepLabel: "Step 1/2", title: "Basic Information" },
  { id: 2, stepLabel: "Step 2/2", title: "Business Hours Settings" },
  { id: 4, stepLabel: "Step 4/6", title: "Preview" },
];

export interface TimeValue {
  h: string;
  m: string;
  ap: string;
}

export interface BreakEntry {
  name: string;
  from: string;
  to: string;
}

export interface DayState {
  on: boolean;
  from: TimeValue;
  to: TimeValue;
  breaks: BreakEntry[];
}

export type DaysState = Record<string, DayState>;

export const parseTime = (str: string): TimeValue => {
  const match = str && str.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
  if (match) {
    return {
      h: match[1].padStart(2, "0"),
      m: match[2].padStart(2, "0"),
      ap: match[3].toUpperCase(),
    };
  }
  return { h: "08", m: "00", ap: "AM" };
};

export const fmtTime = (t: TimeValue): string => `${t.h}.${t.m} ${t.ap}`;

export const defTime = (): TimeValue => ({ h: "08", m: "30", ap: "AM" });


// helper: convert TimeValue or string to 24h format "HH:MM:SS"
export const convertTimeTo24 = (time: TimeValue | string): string => {
  let h = "00",
    m = "00",
    ap = "AM";

  if (typeof time === "string") {
    const match = time.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
    if (match) {
      h = match[1];
      m = match[2];
      ap = match[3].toUpperCase();
    }
  } else {
    h = time.h;
    m = time.m;
    ap = time.ap.toUpperCase();
  }

  let hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
};

const toMinutes = (t) => {
  let h = parseInt(t.h); const m = parseInt(t.m);
  if (t.ap === "PM" && h !== 12) h += 12;
  if (t.ap === "AM" && h === 12) h = 0;
  return h * 60 + m;
};
const parseBreakStr = (str) => {
  const match = str.match(/(\d+)[.:](\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let h = parseInt(match[1]); const m = parseInt(match[2]); const ap = match[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + m;
};
const toTimeStr = (mins) => {
  let h = Math.floor(mins / 60); const m = mins % 60;
  const ap = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12; if (h === 0) h = 12;
  return `${String(h).padStart(2,"0")}.${String(m).padStart(2,"0")} ${ap}`;
};

export const generateTimeline = (day: any, lessonDuration: number) => {
  const safeParse = (t: any) => {
    if (!t) return 0;

    let h = parseInt(t.h, 10);
    const m = parseInt(t.m, 10);

    if (t.ap === "PM" && h !== 12) h += 12;
    if (t.ap === "AM" && h === 12) h = 0;

    return h * 60 + m;
  };

  const format = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    const ap = h >= 12 ? "PM" : "AM";
    const hr = h % 12 || 12;

    return `${String(hr).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
  };

  const start = safeParse(day.from);
  const end = safeParse(day.to);

  if (!start || !end || start >= end) return [];

  const breaks = (day.breaks || [])
    .map((b: any) => ({
      ...b,
      start: safeParse(parseTime(b.from)),
      end: safeParse(parseTime(b.to)),
    }))
    .filter((b: any) => b.end > start && b.start < end) // ✅ IMPORTANT clamp
    .sort((a: any, b: any) => a.start - b.start);

  const result: any[] = [];
  let cursor = start;

  for (const brk of breaks) {
    if (cursor < brk.start) {
      result.push({
        type: "lesson",
        from: format(cursor),
        to: format(brk.start),
      });
    }

    result.push({
      type: "break",
      from: format(brk.start),
      to: format(brk.end),
      name: brk.name,
    });

    cursor = Math.max(cursor, brk.end);
  }

  if (cursor < end) {
    result.push({
      type: "lesson",
      from: format(cursor),
      to: format(end),
    });
  }

  return result;
};