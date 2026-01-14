"use client";
import React, { useState } from "react";
import {
  Search,
  Grid,
  List,
  MoreVertical,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";

const CBCTeachersView = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("Active");

  const teachers = [
    {
      id: 1,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      subjects: ["Math", "Eng", "Physics"],
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      rating: 4.5,
      students: 45,
      attendance: "90%",
      lessons: { published: 45, pending: 45 },
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      subjects: ["Math", "Eng", "Physics"],
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      rating: 4.5,
      students: 45,
      attendance: "90%",
      lessons: { published: 45, pending: 45 },
    },
    {
      id: 3,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      subjects: ["Math", "Eng", "Physics"],
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
      rating: 4.5,
      students: 45,
      attendance: "90%",
      lessons: { published: 45, pending: 45 },
    },
  ];

  const sidebarItems = [
    { icon: Users, label: "Teachers", active: true },
    { icon: GraduationCap, label: "Students" },
    { icon: BookOpen, label: "Lessons" },
    { icon: Layers, label: "Extra Curricula" },
    { icon: Calendar, label: "Schedule" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-gray-200 p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors select-none ${
                  item.active
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-50 font-normal"
                }`}
                type="button"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 select-none">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3" />
              Curriculum & Subjects
            </span>
            <span>›</span>
            <span className="text-blue-600 font-semibold">CBC</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-extrabold text-gray-900 mb-0.5 leading-tight">
            Competence-Based Curriculum
          </h1>
          <p className="text-xs text-gray-600 leading-snug">
            Manage details about this curriculum
          </p>
        </div>

        {/* Tabs and Actions */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-bold text-gray-900 select-none">
              Teachers
            </h4>

            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2 select-none"
            >
              <Users className="w-4 h-4" />
              Recruit New Teacher
            </button>
          </div>

          {/* Search and View Toggle */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded"
                aria-label="Menu"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-0.5 bg-blue-100 rounded-md p-[2px]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-blue-50"
                  }`}
                  aria-label="Grid view"
                  type="button"
                >
                  <Grid className="w-4 h-4 text-blue-600" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-blue-50"
                  }`}
                  aria-label="List view"
                  type="button"
                >
                  <List className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Active/Inactive Filter */}
          <div className="flex items-center gap-4 mt-4 select-none">
            <button
              onClick={() => setActiveFilter("Active")}
              className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                activeFilter === "Active"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
              type="button"
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter("Inactive")}
              className={`text-sm font-semibold pb-2 border-b-2 transition-colors ${
                activeFilter === "Inactive"
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
              type="button"
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="p-6 flex-1 overflow-auto">
          <div
            className={`grid gap-4 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                style={{ borderRadius: "0.5rem" }} // 8px border-radius exactly
              >
                {/* Header */}
                <div className="p-4 pb-2">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className="text-sm font-semibold text-gray-900 leading-tight"
                        style={{ lineHeight: "1.2rem" }}
                      >
                        {teacher.name}
                      </h3>
                      <p className="text-xs text-gray-600">{teacher.email}</p>
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subject Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {teacher.subjects.map((subject, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-[2px] bg-gray-100 text-gray-700 text-[10px] font-semibold rounded select-none"
                        style={{ lineHeight: "1rem" }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div
                  className="relative h-30 bg-gray-200"
                  style={{ height: 120 }}
                >
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Stats */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div className="grid grid-cols-3 gap-3 mb-3 select-none">
                    <div>
                      <div className="text-[10px] text-gray-500 mb-0.5 leading-none">
                        Rating
                      </div>
                      <div className="text-sm font-semibold text-gray-900 leading-tight">
                        {teacher.rating}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-0.5 leading-none">
                        Students
                      </div>
                      <div className="text-sm font-semibold text-gray-900 leading-tight">
                        {teacher.students}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 mb-0.5 leading-none">
                        Attendance
                      </div>
                      <div className="text-sm font-semibold text-green-600 leading-tight">
                        {teacher.attendance}
                      </div>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="flex items-end justify-between pt-3 border-t border-gray-200 select-none">
                    <div className="flex items-baseline gap-3">
                      <div>
                        <div className="text-[10px] text-gray-500 mb-0.5 leading-none">
                          Lessons
                        </div>
                        <div className="text-[11px] font-normal text-gray-900 leading-tight">
                          {teacher.lessons.published} Published
                        </div>
                      </div>
                      <div className="text-[11px] text-gray-500 pb-0.5 leading-tight">
                        {teacher.lessons.pending} Pending
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-800 text-[11px] font-normal underline pb-0.5"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBCTeachersView;
