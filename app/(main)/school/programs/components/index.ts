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
