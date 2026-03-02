"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";

type ProgrammeBreak = {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
};

type CalendarProps = {
  lessonDuration: number;
  setLessonDuration: (value: number) => void;
  breaks: ProgrammeBreak[];
  setBreaks: React.Dispatch<React.SetStateAction<ProgrammeBreak[]>>;
};

export default function CalendarSection({
  lessonDuration,
  setLessonDuration,
  breaks,
  setBreaks,
}: CalendarProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [lessonDuration, setLessonDuration] = useState<number | "">(60);
  // const [breaks, setBreaks] = useState<ProgrammeBreak[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  /* -------------------------- Helper Functions ------------------------- */

  const addBreak = () => {
    setBreaks([
      ...breaks,
      { id: crypto.randomUUID(), label: "", startTime: "", endTime: "" },
    ]);
  };

  const updateBreak = (
    id: string,
    field: keyof ProgrammeBreak,
    value: string
  ) => {
    setBreaks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const removeBreak = (id: string) => {
    setBreaks((prev) => prev.filter((b) => b.id !== id));
  };

  const timeToMinutes = (time: string) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const checkConflicts = () => {
    const newErrors: string[] = [];

    // Lesson slot in minutes (assuming lesson starts at 08:00 to 16:00)
    const lessonStart = 8 * 60;
    const lessonEnd = 16 * 60;

    // Check each break
    breaks.forEach((brk, i) => {
      const start = timeToMinutes(brk.startTime);
      const end = timeToMinutes(brk.endTime);

      // Empty times
      if (!brk.startTime || !brk.endTime) {
        newErrors.push(`Break "${brk.label || i + 1}" is incomplete`);
        return;
      }

      // Start must be before end
      if (start >= end) {
        newErrors.push(
          `Break "${brk.label || i + 1}" has start time after end time`
        );
      }

      // Within lesson hours
      if (start < lessonStart || end > lessonEnd) {
        newErrors.push(
          `Break "${
            brk.label || i + 1
          }" must be within lesson hours (08:00-16:00)`
        );
      }

      // Overlapping with other breaks
      breaks.forEach((other, j) => {
        if (i === j) return;
        const oStart = timeToMinutes(other.startTime);
        const oEnd = timeToMinutes(other.endTime);

        if (start < oEnd && end > oStart) {
          newErrors.push(
            `Break "${brk.label || i + 1}" overlaps with "${
              other.label || j + 1
            }"`
          );
        }
      });
    });

    setErrors(newErrors);
  };

  /* -------------------------- Effect ------------------------- */
  useEffect(() => {
    checkConflicts();
  }, [breaks, lessonDuration]);

  /* -------------------------- JSX ------------------------- */

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Calendar size={20} />
        Calendar Structure
      </h2>

      {/* Start / End Dates & Lesson Duration */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input border rounded-lg px-3 py-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input border rounded-lg px-3 py-2"
        />
        <input
          type="number"
          value={lessonDuration}
          onChange={(e) =>
            setLessonDuration(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
          placeholder="Lesson Duration (mins)"
          className="input border rounded-lg px-3 py-2"
        />
      </div>

      {/* Break Times */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">
            Break Times (Mandatory for School Programmes)
          </h3>
          <button
            type="button"
            onClick={addBreak}
            className="flex items-center gap-1 text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg"
          >
            <Plus size={14} />
            Add Break
          </button>
        </div>

        {breaks.length === 0 && (
          <p className="text-sm text-gray-500">No breaks added yet.</p>
        )}

        {breaks.map((brk, idx) => (
          <div
            key={brk.id}
            className="grid grid-cols-3 gap-4 items-center bg-gray-50 p-3 rounded-lg"
          >
            <input
              type="text"
              placeholder="Break Name"
              value={brk.label}
              onChange={(e) => updateBreak(brk.id, "label", e.target.value)}
              className="input border rounded-lg px-3 py-2"
            />
            <input
              type="time"
              value={brk.startTime}
              onChange={(e) => updateBreak(brk.id, "startTime", e.target.value)}
              className="input border rounded-lg px-3 py-2"
            />
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={brk.endTime}
                onChange={(e) => updateBreak(brk.id, "endTime", e.target.value)}
                className="input border rounded-lg px-3 py-2"
              />
              <button
                onClick={() => removeBreak(brk.id)}
                className="text-red-600 p-1 hover:bg-red-100 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Conflict Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm text-red-700">
            <strong>Conflicts / Errors:</strong>
            <ul className="list-disc ml-5 mt-1">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
