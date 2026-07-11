"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  BookOpen,
  GraduationCap,
  Users,
  ClipboardCheck,
  Calendar,
  Bell,
  UserPlus,
  FileText,
  Clock,
} from "lucide-react";

type ActivityType =
  | "Enrollment"
  | "Lesson"
  | "Assignment"
  | "Attendance"
  | "Exam"
  | "Announcement";

interface Activity {
  id: number;
  user: string;
  role: string;
  action: string;
  time: string;
  type: ActivityType;
}

export default function ActivityFeedPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const activities: Activity[] = [
    {
      id: 1,
      user: "John Kamau",
      role: "Teacher",
      action: "published Mathematics Assignment for Grade 8.",
      time: "2 mins ago",
      type: "Assignment",
    },
    {
      id: 2,
      user: "Mary Wanjiku",
      role: "Administrator",
      action: "created a new school announcement.",
      time: "15 mins ago",
      type: "Announcement",
    },
    {
      id: 3,
      user: "Brian Otieno",
      role: "Student",
      action: "submitted Science Assignment.",
      time: "30 mins ago",
      type: "Assignment",
    },
    {
      id: 4,
      user: "Grace Achieng",
      role: "Teacher",
      action: "marked attendance for Grade 6.",
      time: "1 hour ago",
      type: "Attendance",
    },
    {
      id: 5,
      user: "School Admin",
      role: "Administrator",
      action: "enrolled 15 new students.",
      time: "2 hours ago",
      type: "Enrollment",
    },
    {
      id: 6,
      user: "James Kiptoo",
      role: "Teacher",
      action: "scheduled an English lesson.",
      time: "3 hours ago",
      type: "Lesson",
    },
    {
      id: 7,
      user: "Lucy Njeri",
      role: "Examination Office",
      action: "published End Term Examination timetable.",
      time: "Yesterday",
      type: "Exam",
    },
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.user.toLowerCase().includes(search.toLowerCase()) ||
        activity.action.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || activity.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [activities, filter, search]);

  const getIcon = (type: ActivityType) => {
    switch (type) {
      case "Enrollment":
        return <UserPlus size={18} />;
      case "Lesson":
        return <BookOpen size={18} />;
      case "Assignment":
        return <ClipboardCheck size={18} />;
      case "Attendance":
        return <Users size={18} />;
      case "Exam":
        return <GraduationCap size={18} />;
      case "Announcement":
        return <Bell size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getColor = (type: ActivityType) => {
    switch (type) {
      case "Enrollment":
        return "bg-green-100 text-green-700";
      case "Lesson":
        return "bg-blue-100 text-blue-700";
      case "Assignment":
        return "bg-purple-100 text-purple-700";
      case "Attendance":
        return "bg-orange-100 text-orange-700";
      case "Exam":
        return "bg-red-100 text-red-700";
      case "Announcement":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Activity Feed
            </h1>
            <p className="text-slate-500 mt-1">
              Monitor all activities happening across your school.
            </p>
          </div>

          <button className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Refresh Feed
          </button>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-slate-500 text-sm">Today's Activities</p>
            <h2 className="text-3xl font-bold mt-2">128</h2>
          </div>

          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-slate-500 text-sm">Assignments</p>
            <h2 className="text-3xl font-bold mt-2">38</h2>
          </div>

          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-slate-500 text-sm">Attendance</p>
            <h2 className="text-3xl font-bold mt-2">42</h2>
          </div>

          <div className="bg-white rounded-xl p-5 border shadow-sm">
            <p className="text-slate-500 text-sm">Announcements</p>
            <h2 className="text-3xl font-bold mt-2">9</h2>
          </div>

        </div>

        {/* Filters */}

        <div className="bg-white border rounded-xl p-4 mb-6 shadow-sm">

          <div className="flex flex-col lg:flex-row gap-4">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <input
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search activities..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative w-full lg:w-64">
              <Filter
                size={18}
                className="absolute left-3 top-3.5 text-slate-400"
              />

              <select
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none appearance-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>Enrollment</option>
                <option>Lesson</option>
                <option>Assignment</option>
                <option>Attendance</option>
                <option>Exam</option>
                <option>Announcement</option>
              </select>
            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="bg-white rounded-xl border shadow-sm">

          <div className="p-6 border-b">
            <h2 className="font-semibold text-lg">
              Recent Activities
            </h2>
          </div>

          <div className="relative">

            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id}
                className="relative flex gap-5 px-6 py-6 hover:bg-slate-50 transition"
              >
                {index !== filteredActivities.length - 1 && (
                  <div className="absolute left-[39px] top-16 w-[2px] h-full bg-slate-200"></div>
                )}

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(
                    activity.type
                  )}`}
                >
                  {getIcon(activity.type)}
                </div>

                <div className="flex-1">

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">

                        <h3 className="font-semibold text-slate-900">
                          {activity.user}
                        </h3>

                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                          {activity.role}
                        </span>

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getColor(
                            activity.type
                          )}`}
                        >
                          {activity.type}
                        </span>

                      </div>

                      <p className="text-slate-600 mt-2">
                        {activity.action}
                      </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 whitespace-nowrap">
                      <Clock size={15} />
                      {activity.time}
                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 text-center text-sm text-slate-500 flex justify-center items-center gap-2">
          <Calendar size={15} />
          Showing latest school activities.
        </div>
      </div>
    </div>
  );
}