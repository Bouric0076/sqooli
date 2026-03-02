"use client";

type ProgrammeBreak = {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
};

type Props = {
  lessonDuration: number;
  breaks: ProgrammeBreak[];
};

export default function TimetableGrid({ lessonDuration, breaks }: Props) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const SCHOOL_START = "08:00";
  const SCHOOL_END = "16:00";

  /* ----------------------- Time Utilities ----------------------- */

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins: number) => {
    const h = Math.floor(mins / 60)
      .toString()
      .padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  /* ----------------------- Generate Slots ----------------------- */

  const generateSlots = () => {
    const start = timeToMinutes(SCHOOL_START);
    const end = timeToMinutes(SCHOOL_END);

    let current = start;
    const slots: {
      type: "lesson" | "break";
      start: number;
      end: number;
      label?: string;
    }[] = [];

    while (current < end) {
      const next = current + lessonDuration;

      // Check if this time falls inside a break
      const overlappingBreak = breaks.find((brk) => {
        const bStart = timeToMinutes(brk.startTime);
        const bEnd = timeToMinutes(brk.endTime);
        return current < bEnd && next > bStart;
      });

      if (overlappingBreak) {
        const bStart = timeToMinutes(overlappingBreak.startTime);
        const bEnd = timeToMinutes(overlappingBreak.endTime);

        slots.push({
          type: "break",
          start: bStart,
          end: bEnd,
          label: overlappingBreak.label || "Break",
        });

        current = bEnd;
      } else {
        slots.push({
          type: "lesson",
          start: current,
          end: next,
        });

        current = next;
      }
    }

    return slots;
  };

  const slots = generateSlots();

  /* ----------------------- JSX ----------------------- */

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Auto-Generated Timetable</h2>

      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {days.map((d) => (
              <th key={d} className="border p-2">
                {d}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {slots.map((slot, index) => (
            <tr key={index}>
              <td className="border p-2 font-medium whitespace-nowrap">
                {minutesToTime(slot.start)} - {minutesToTime(slot.end)}
              </td>

              {slot.type === "break" ? (
                <td
                  colSpan={days.length}
                  className="border p-2 text-center bg-yellow-100 font-medium text-yellow-800"
                >
                  {slot.label}
                </td>
              ) : (
                days.map((day) => (
                  <td key={day} className="border p-2 text-center bg-green-50">
                    Available
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
