"use client";
import { useState } from "react";

const teachers = [
  { id: 1, name: "Lucy Juma", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Jason Juma", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Jason Juma", avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 4, name: "Jason Juma", avatar: "https://i.pravatar.cc/40?img=4" },
  { id: 5, name: "Jason Juma", avatar: "https://i.pravatar.cc/40?img=5" },
];

const days = Array.from({ length: 17 }, (_, i) => i + 1);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function AttendanceManagementExact() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Title */}
      <div className="mb-2">
        <h1 className="text-lg font-semibold">Attendance Management</h1>
        <p className="text-sm text-gray-500">Manage attendance of teachers</p>
      </div>

      {/* Search + Date range */}
      <div className="flex justify-between items-center mb-3">
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-2 rounded-md text-sm w-64"
        />
        <span className="text-sm text-gray-600">01 Mar 2025 - 7 Mar 2025</span>
      </div>

      {/* Year + Months */}
      <div className="flex items-center gap-2 mb-3">
        <select className="border rounded-md px-3 py-1 text-sm">
          <option>2025</option>
        </select>

        <div className="flex gap-1 bg-gray-200 p-1 rounded-md">
          {months.map((m) => (
            <button
              key={m}
              className={`px-3 py-1 text-xs rounded-md ${
                m === "Mar"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-300"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-x-auto border">
        <div className="min-w-[1100px]">
          {/* Header */}
          <div className="flex border-b text-xs text-gray-500">
            <div className="w-56 px-4 py-3 sticky left-0 bg-white z-10"></div>

            {days.map((day) => (
              <div
                key={day}
                className={`w-14 py-2 text-center border-l ${
                  day % 7 === 0 ? "border-r-2 border-gray-300" : ""
                }`}
              >
                <div className="text-gray-700 font-medium">{day}</div>
                <div className="text-[10px]">Mar</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {teachers.map((teacher, rowIdx) => (
            <div key={teacher.id} className="flex border-b last:border-b-0">
              {/* Name */}
              <div className="w-56 px-4 py-3 flex items-center gap-2 sticky left-0 bg-white z-10">
                <img src={teacher.avatar} className="w-8 h-8 rounded-full" />
                <span className="text-sm">{teacher.name}</span>
              </div>

              {/* Cells */}
              {days.map((day) => {
                const isFuture = day > 11;
                const isAbsent = day === 4;

                return (
                  <div
                    key={day}
                    className={`w-14 h-12 flex items-center justify-center border-l ${
                      day % 7 === 0 ? "border-r-2 border-gray-300" : ""
                    } ${isFuture ? "bg-gray-50" : ""}`}
                  >
                    {!isFuture && (
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isAbsent ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
