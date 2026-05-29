// scheduler.ts

import { parseTime } from "./constants";

/* ================= TIME HELPERS ================= */

const toMinutes = (t: any) => {
  if (!t) return 0;

  let h = parseInt(t.h, 10);
  const m = parseInt(t.m, 10);

  if (t.ap === "PM" && h !== 12) h += 12;
  if (t.ap === "AM" && h === 12) h = 0;

  return h * 60 + m;
};

const formatTime = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;

  const ap = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;

  return `${String(hr).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )} ${ap}`;
};

/* ================= CORE ENGINE ================= */

export const buildSchedule = (day: any, lessonDuration: number) => {
  const start = toMinutes(day.from);
  const end = toMinutes(day.to);

  if (!start || !end || start >= end) return [];

  /* ---- normalize breaks ---- */
  const breaks = (day.breaks || [])
    .map((b: any) => {
      const startMin = toMinutes(parseTime(b.from));
      const endMin = toMinutes(parseTime(b.to));

      return {
        ...b,
        start: startMin,
        end: endMin,
      };
    })
    .filter((b: any) => b.end > start && b.start < end)
    .sort((a: any, b: any) => a.start - b.start);

  const timeline: any[] = [];
  let cursor = start;

  /* ================= BUILD ================= */

  for (const brk of breaks) {
    /* lessons before break */
    while (cursor + lessonDuration <= brk.start) {
      timeline.push({
        type: "lesson",
        from: cursor,
        to: cursor + lessonDuration,
      });
      cursor += lessonDuration;
    }

    /* partial lesson before break */
    if (cursor < brk.start) {
      timeline.push({
        type: "lesson",
        from: cursor,
        to: brk.start,
      });
    }

    /* break (IMPORTANT: always included) */
    timeline.push({
      type: "break",
      from: brk.start,
      to: brk.end,
      name: brk.name,
    });

    cursor = brk.end;
  }

  /* remaining lessons after last break */
  while (cursor + lessonDuration <= end) {
    timeline.push({
      type: "lesson",
      from: cursor,
      to: cursor + lessonDuration,
    });

    cursor += lessonDuration;
  }

  /* final partial lesson */
  if (cursor < end) {
    timeline.push({
      type: "lesson",
      from: cursor,
      to: end,
    });
  }

  /* ================= FORMAT ================= */

  return timeline.map((t) => ({
    ...t,
    from: formatTime(t.from),
    to: formatTime(t.to),
  }));
};