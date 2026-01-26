"use client";

import { Search, Grid, List } from "lucide-react";
import { useState } from "react";

interface LessonsHeaderProps {
  onSearchChange?: (value: string) => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
  onStatusChange?: (status: "Active" | "Inactive") => void;
}

export default function LessonsHeader({
  onSearchChange,
  onViewModeChange,
  onStatusChange,
}: LessonsHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState<"Active" | "Inactive">(
    "Active"
  );

  return (
    <div>
      {/* Title Row */}
      {/* <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Lessons</h1>

        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Create Lesson
        </button>
      </div> */}

      {/* Search and View Toggle */}
      <div className="mb-4 flex items-center justify-between ">
        <div className="relative mr-4 flex-1 ">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border bg-white border-gray-300 py-2 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearchChange?.(e.target.value);
            }}
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-2 hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg
              className="h-5 w-5 text-gray-600"
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
          <div className="flex items-center gap-0.5 rounded-md bg-blue-100 p-[2px]">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => {
                setViewMode("grid");
                onViewModeChange?.("grid");
              }}
              className={`rounded p-1.5 transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-blue-50"
              }`}
            >
              <Grid className="h-5 w-5 text-blue-600" />
            </button>

            <button
              type="button"
              aria-label="List view"
              onClick={() => {
                setViewMode("list");
                onViewModeChange?.("list");
              }}
              className={`rounded p-1.5 transition-colors ${
                viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-blue-50"
              }`}
            >
              <List className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Active / Inactive Filter */}
      <div className="mb-6 flex select-none items-center gap-4">
        <button
          type="button"
          onClick={() => {
            setActiveFilter("Active");
            onStatusChange?.("Active");
          }}
          className={`border-b-2 pb-2 text-sm font-semibold transition-colors ${
            activeFilter === "Active"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Active
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveFilter("Inactive");
            onStatusChange?.("Inactive");
          }}
          className={`border-b-2 pb-2 text-sm font-semibold transition-colors ${
            activeFilter === "Inactive"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Inactive
        </button>
      </div>
    </div>
  );
}
