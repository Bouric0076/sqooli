"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const eventsData = [
  {
    id: "1",
    title: "Jane Doe",
    start: "2026-02-01",
    extendedProps: {
      type: "Assignment",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    },
    color: "#60a5fa",
  },
  {
    id: "2",
    title: "Jane Doe",
    start: "2026-02-02",
    extendedProps: {
      type: "Exam",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    color: "#f87171",
  },
  {
    id: "3",
    title: "Jane Doe",
    start: "2026-02-14",
    extendedProps: {
      type: "School Event",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    color: "#a78bfa",
  },
];

export default function LessonSchedulingPage() {
  const [events, setEvents] = useState(eventsData);

  const router = useRouter();

  function renderEventContent(eventInfo) {
    const { avatar, type } = eventInfo.event.extendedProps;

    return (
      <div className="flex items-center gap-2 text-xs">
        <img
          src={avatar}
          alt="avatar"
          className="w-5 h-5 rounded-full border"
        />
        <div className="leading-tight">
          <p className="font-semibold">{eventInfo.event.title}</p>
          <p className="text-[10px] opacity-80">{type}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Timetable</h1>
          <p className="text-sm text-gray-500">
            Manage student timetable and upcoming Timetable
          </p>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 bg-white rounded-xl p-4 shadow">
          <h2 className="font-semibold mb-3">Schedule</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{ left: "", center: "title", right: "" }}
            height="43vh"
          />

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Key</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-400 rounded"></span> Assignment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-400 rounded"></span> Exam
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-purple-400 rounded"></span> School
                Event
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="col-span-9 bg-white rounded-xl p-4 shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">

            </div>
            <select className="border px-3 py-1 rounded text-sm">
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={renderEventContent}
            selectable={true}
            height="75vh"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "",
            }}
          />
        </div>
      </div>
    </div>
  );
}

