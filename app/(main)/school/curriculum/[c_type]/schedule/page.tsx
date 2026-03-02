import React from "react";

export default function ScheduleCalendarUI() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl rounded-xl bg-white shadow-sm">
        <div className="flex">
          {/* Left Sidebar */}
          <aside className="w-72 border-r p-5">
            <h2 className="mb-4 text-sm font-semibold text-gray-600">
              Schedule
            </h2>

            {/* Mini Calendar */}
            <div className="rounded-lg border p-3">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-600">
                <span>February 2023</span>
                <div className="flex gap-2">
                  <button>‹</button>
                  <button>›</button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-gray-500">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full py-1 ${
                      i + 1 === 10 ? "bg-blue-600 text-white" : "text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Key */}
            <div className="mt-6">
              <h3 className="mb-3 text-xs font-semibold text-gray-500">Key</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-blue-500"></span>
                  Assignment
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-red-500"></span>
                  Exam
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-purple-500"></span>
                  School Event
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Calendar */}
          <main className="flex-1 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-sm font-semibold text-gray-700">
                February 2023
              </h1>
              <div className="flex gap-2">
                <button className="rounded-md border px-3 py-1 text-xs text-gray-600">
                  Add filters
                </button>
                <button className="rounded-md border px-3 py-1 text-xs text-gray-600">
                  Month
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 border-t text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="border-b p-2 font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}

              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-28 border p-2">
                  <div className="mb-1 text-[11px] text-gray-500">
                    {i + 1 <= 28 ? i + 1 : ""}
                  </div>

                  {/* Event */}
                  {(i === 1 || i === 2 || i === 12) && (
                    <div className="rounded-md bg-purple-100 px-2 py-1 text-[11px] text-purple-700">
                      Jane Doe
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
