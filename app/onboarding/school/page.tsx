"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const curriculums = [
  {
    id: "private",
    title: "Private",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-3v-6H8v6H5a2 2 0 0 1-2-2V10z" />
      </svg>
    ),
    bgColor: "bg-yellow-100",
  },
  {
    id: "public",
    title: "Public",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-pink-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 16h8M12 8v8" />
      </svg>
    ),
    bgColor: "bg-pink-100",
  },
  {
    id: "online",
    title: "Online",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
        <path d="M8 21h8M12 7v14" />
      </svg>
    ),
    bgColor: "bg-green-100",
  },
];

export default function SchoolSelection() {
  // CHANGED: State is now a single string or null
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  // CHANGED: Logic now sets the specific ID or clears it
  const handleSelection = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* Logo Section */}
      <div className="flex gap-1 mb-6">
        {["s", "q", "o", "o", "l", "i"].map((char, i) => {
          const letterColors = [
            "bg-[#477ec3]",
            "bg-[#8db2e6]",
            "bg-[#4d9fe4]",
            "bg-[#4d9fe4]",
            "bg-[#51739d]",
            "bg-[#264a73]",
          ];
          const borderColors = [
            "border-[#3d6eb7]",
            "border-[#7a9fd3]",
            "border-[#3d6eb7]",
            "border-[#3d6eb7]",
            "border-[#3e5f8e]",
            "border-[#1d3759]",
          ];
          const scores = [16, 9, 8, 8, 3, 10];

          return (
            <div
              key={i}
              className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-extrabold text-xl relative border-b-4 ${borderColors[i]} ${letterColors[i]}`}
            >
              <span className="absolute -top-2 left-1 text-[8px] opacity-70 font-semibold drop-shadow-sm">
                {scores[i]}
              </span>
              {char}
            </div>
          );
        })}
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
        Welcome to Sqooli
      </h1>
      <p className="text-sm text-gray-500 mb-10 text-center max-w-md">
        Let’s get you started on your journey to better learning
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {curriculums.map(({ id, title, icon, bgColor }) => {
          // CHANGED: Single ID comparison
          const isSelected = selectedId === id;

          return (
            <button
              key={id}
              onClick={() => handleSelection(id)}
              className={`relative flex flex-col items-center p-8 rounded-3xl border-2 shadow-md transition-all ${
                isSelected
                  ? "border-[#2b7bb9] bg-blue-50 ring-4 ring-blue-100"
                  : "border-transparent bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`rounded-full p-4 mb-5 flex items-center justify-center ${bgColor}`}
              >
                {icon}
              </div>
              <span className="text-lg font-bold text-gray-900">{title}</span>

              {/* Checkmark */}
              <div
                className={`absolute top-4 right-4 h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-green-500 border-green-500 scale-110"
                    : "border-gray-300 bg-white"
                }`}
              >
                {isSelected && (
                  <Check size={16} className="text-white stroke-[3px]" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer buttons */}
      <div className="mt-16 flex gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-full font-bold shadow-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <button
          // CHANGED: Check for truthy string instead of array length
          onClick={() => router.push("/onboarding/curriculum")} // ADD THIS LINE
          disabled={!selectedId}
          className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold shadow-md transition-colors ${
            selectedId
              ? "bg-[#2b7bb9] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save & Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
