"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const curriculums = [
  { id: "cbc", title: "CBC", icon: "📑", bgColor: "bg-blue-50" },
  {
    id: "844",
    title: "8-4-4",
    icon: "8-4-4",
    bgColor: "bg-orange-50",
    isTextIcon: true,
  },
  { id: "cambridge", title: "Cambridge", icon: "🛡️", bgColor: "bg-red-50" },
];

export default function CurriculumSelection() {
  const [selectedIds, setSelectedIds] = useState([]);
  const router = useRouter();

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* Logo Section */}
      <div className="flex gap-1 mb-6">
        {["s", "q", "o", "o", "l", "i"].map((char, i) => {
          const letterColors = [
            "bg-blue-600",
            "bg-blue-400",
            "bg-blue-500",
            "bg-blue-500",
            "bg-blue-700",
            "bg-blue-900",
          ];
          const borderColors = [
            "border-blue-700",
            "border-blue-500",
            "border-blue-700",
            "border-blue-700",
            "border-blue-800",
            "border-blue-950",
          ];
          const scores = [16, 9, 8, 8, 3, 10];

          return (
            <div
              key={i}
              className={`w-12 h-12 rounded-md flex items-center justify-center text-white font-extrabold text-xl relative border-b-4 ${borderColors[i]} ${letterColors[i]}`}
            >
              <span className="absolute -top-2 left-1 text-xs opacity-70 font-semibold">
                {scores[i]}
              </span>
              {char}
            </div>
          );
        })}
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        What curriculums do you offer?
      </h1>
      <p className="text-sm text-gray-500 mb-10 text-center max-w-md">
        Select all that apply
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {curriculums.map(({ id, title, icon, bgColor, isTextIcon }) => {
          const isSelected = selectedIds.includes(id);

          return (
            <button
              key={id}
              onClick={() => toggleSelection(id)}
              className={`relative flex flex-col items-center p-8 rounded-3xl border-2 shadow-md transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-4 ring-blue-100"
                  : "border-transparent bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`${
                  isTextIcon ? "text-2xl font-bold text-orange-600" : "text-5xl"
                } rounded-full p-4 mb-5 flex items-center justify-center ${bgColor}`}
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
          className="flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-full font-bold shadow-sm hover:shadow-md transition-shadow"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <button
          onClick={() => router.push("/onboarding/school/school-details")} // ADD THIS LINE
          disabled={selectedIds.length === 0}
          className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold shadow-md transition-all ${
            selectedIds.length > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Save & Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
