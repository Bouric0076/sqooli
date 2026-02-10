"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

// Icons - replace with your actual icon components or SVGs
const Search = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx={11} cy={11} r={8} />
    <line x1={21} y1={21} x2={16.65} y2={16.65} />
  </svg>
);
const Grid = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x={3} y={3} width={7} height={7} />
    <rect x={14} y={3} width={7} height={7} />
    <rect x={14} y={14} width={7} height={7} />
    <rect x={3} y={14} width={7} height={7} />
  </svg>
);
const List = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <line x1={8} y1={6} x2={21} y2={6} />
    <line x1={8} y1={12} x2={21} y2={12} />
    <line x1={8} y1={18} x2={21} y2={18} />
    <circle cx={3} cy={6} r={2} />
    <circle cx={3} cy={12} r={2} />
    <circle cx={3} cy={18} r={2} />
  </svg>
);
const MoreVertical = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx={12} cy={5} r={1} />
    <circle cx={12} cy={12} r={1} />
    <circle cx={12} cy={19} r={1} />
  </svg>
);

// Types for Student and enrollments (mapped from your API)
interface Enrollment {
  accountId: number;
  curriculumId: number;
  curriculumName: string;
  gradeLevelId: number;
  gradeLevelName: string;
  schoolId: number;
  schoolName: string;
  isIndependent: boolean;
  subjects: string[];
}

interface Student {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  bio: string;
  workplace: string;
  tscNumber: string;
  certificateLevelId: number;
  certificateLevelName: string;
  subjectCount: number;
  ratingsCount: number;
  averageRating: number;
  lessonCount: number;
  attendanceRating: number;
  pendingLessonCount: number;
  enrollments: Enrollment[];
  image?: string;
}

interface StudentListingProps {
  students: Student[];
}

const StudentListing: React.FC<StudentListingProps> = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState<
    "Active" | "Inactive" | null
  >(null);

  // Filter Students based on search and activeFilter
  const filteredStudents = students.filter((Student) => {
    const matchesSearch =
      Student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Student.workplace.toLowerCase().includes(searchTerm.toLowerCase());

    const isActive = Student.attendanceRating > 0;

    if (activeFilter === "Active" && !isActive) return false;
    if (activeFilter === "Inactive" && isActive) return false;

    return matchesSearch;
  });

  // Columns for DataTable when list view
  const columns = [
    {
      name: "Name",
      selector: (row: Student) => row.fullName,
      sortable: true,
      cell: (row: Student) => (
        <div>
          <div className="font-semibold">{row.fullName}</div>
          <div className="text-xs text-gray-600">{row.email}</div>
        </div>
      ),
    },
    {
      name: "Workplace",
      selector: (row: Student) => row.workplace,
      sortable: true,
      grow: 1,
    },
    {
      name: "Certificate Level",
      selector: (row: Student) => row.certificateLevelName,
      sortable: true,
    },
    {
      name: "Rating",
      selector: (row: Student) => row.averageRating,
      sortable: true,
      right: true,
      cell: (row: Student) => row.averageRating.toFixed(1),
    },
    {
      name: "Attendance",
      selector: (row: Student) => row.attendanceRating,
      sortable: true,
      right: true,
      cell: (row: Student) => (
        <span className="text-green-600">{row.attendanceRating}%</span>
      ),
    },
    {
      name: "Lessons",
      selector: (row: Student) => row.lessonCount,
      sortable: true,
      right: true,
      cell: (row: Student) => (
        <div>
          <div>{row.lessonCount} Published</div>
          <div className="text-xs text-gray-500">
            {row.pendingLessonCount} Pending
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Search and View Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 mr-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="button"
            className="p-2 absolute right-3  hover:bg-gray-100 rounded"
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
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-blue-100 rounded-md p-[2px]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-blue-50"
              }`}
              aria-label="Grid view"
              type="button"
            >
              <Grid className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-blue-50"
              }`}
              aria-label="List view"
              type="button"
            >
              <List className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Active/Inactive Filter */}
      <div className="flex items-center gap-4 mb-6 select-none">
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

      {/* Render grid cards or DataTable based on viewMode */}
      {viewMode === "grid" ? (
        <div className="p-1 flex-1 overflow-auto">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((Student) => {
              const subjects = Student.enrollments.flatMap((e) => e.subjects);

              return (
                <div
                  key={Student.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                  style={{ borderRadius: "0.5rem" }}
                >
                  {/* Header */}
                  <div className="p-4 pb-2">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3
                          className="text-sm font-semibold text-gray-900 leading-tight"
                          style={{ lineHeight: "1.2rem" }}
                        >
                          {Student.fullName}
                        </h3>
                        <p className="text-xs text-gray-600">{Student.email}</p>
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
                      {subjects.length > 0 ? (
                        subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-[2px] bg-gray-100 text-gray-700 text-[10px] font-semibold rounded select-none"
                            style={{ lineHeight: "1rem" }}
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs italic">
                          No subjects
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    className="relative h-30 bg-gray-200"
                    style={{ height: 120 }}
                  >
                    <img
                      src={
                        Student.image ||
                        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
                      }
                      alt={Student.fullName}
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
                          {Student.averageRating.toFixed(1)}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 mb-0.5 leading-none">
                          Students
                        </div>
                        <div className="text-sm font-semibold text-gray-900 leading-tight">
                          {Student.enrollments.length}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 mb-0.5 leading-none">
                          Attendance
                        </div>
                        <div className="text-sm font-semibold text-green-600 leading-tight">
                          {Student.attendanceRating}%
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
                            {Student.lessonCount} Published
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-500 pb-0.5 leading-tight">
                          {Student.pendingLessonCount} Pending
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
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-1 flex-1 overflow-auto">
          <DataTable
            columns={columns}
            data={filteredStudents}
            pagination
            highlightOnHover
            dense
            noHeader
          />
        </div>
      )}
    </div>
  );
};

export default StudentListing;
