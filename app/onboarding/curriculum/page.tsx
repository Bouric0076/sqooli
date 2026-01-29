"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

import { useOnboardingStore } from "@/app/store/useOnboardingStore";

type ApiCurriculum = {
  id: number;
  name: string;
};

type UICurriculum = {
  id: number;
  title: string;
  icon: string;
  bgColor: string;
  isTextIcon?: boolean;
};

const curriculumUIMap: Record<
  string,
  { icon: string; bgColor: string; isTextIcon?: boolean }
> = {
  CBC: { icon: "📑", bgColor: "bg-blue-50" },
  "8-4-4": { icon: "8-4-4", bgColor: "bg-orange-50", isTextIcon: true },
  Cambridge: { icon: "🛡️", bgColor: "bg-red-50" },
};

export default function CurriculumSelection() {
  const router = useRouter();

  const {
    schoolEnrollment,
    setSchoolEnrollment,
    addStudentEnrollment,
    addTeacherEnrollment,
    role,
  } = useOnboardingStore();

  const [curriculums, setCurriculums] = useState<UICurriculum[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Initialize selectedIds from persisted store
  useEffect(() => {
    if (!schoolEnrollment?.curriculumIds) return;

    if (role === "SchoolAdmin") {
      setSelectedIds(schoolEnrollment.curriculumIds);
    } else {
      setSelectedIds(
        schoolEnrollment.curriculumIds.length > 0
          ? [schoolEnrollment.curriculumIds[0]]
          : []
      );
    }
  }, [schoolEnrollment?.curriculumIds, role]);

  // Load curriculums from API
  useEffect(() => {
    const loadCurriculums = async () => {
      const res = await fetch("/api/curriculums");
      if (!res.ok) return;

      const json = await res.json();

      const mapped: UICurriculum[] = json.data.items.map(
        (item: ApiCurriculum) => ({
          id: item.id,
          title: item.name,
          icon: curriculumUIMap[item.name]?.icon ?? "📘",
          bgColor: curriculumUIMap[item.name]?.bgColor ?? "bg-gray-50",
          isTextIcon: curriculumUIMap[item.name]?.isTextIcon,
        })
      );

      setCurriculums(mapped);
    };

    loadCurriculums();
  }, []);
  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => {
      let updated: number[];

      if (role === "SchoolAdmin") {
        updated = prev.includes(id)
          ? prev.filter((i) => i !== id)
          : [...prev, id];
      } else {
        // student/teacher: single select
        updated = prev.includes(id) ? [] : [id];
      }

      // Update schoolEnrollment
      setSchoolEnrollment({ curriculumIds: updated });

      // Update student/teacher enrollment
      if (role === "Student") {
        if (updated.length === 0) {
          useOnboardingStore.getState().studentEnrollments = [];
        } else {
          addStudentEnrollment({
            curriculumId: updated[0],
            gradeLevelId: 0,
            schoolId: null,
            subjectIds: [],
          });
        }
      }

      if (role === "Teacher") {
        if (updated.length === 0) {
          useOnboardingStore.getState().teacherEnrollments = [];
        } else {
          addTeacherEnrollment({
            curriculumId: updated[0],
            gradeLevelId: 0,
            schoolId: null,
            subjectIds: [],
          });
        }
      }

      return updated;
    });
  };

  // Next button handler
  const handleNext = () => {
    if (role !== "SchoolAdmin" && selectedIds.length > 1) {
      alert("Please select only one curriculum.");
      return;
    }

    if (selectedIds.length === 0) {
      alert("Please select at least one curriculum to continue.");
      return;
    }

    if (role === "SchoolAdmin") {
      router.push("/onboarding/school/school-details");
    }

    if (role === "Student") {
      router.push("/onboarding/profile/student");
    }

    if (role === "Teacher") {
      router.push("/onboarding/profile/teacher");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <div>
        <img src="/logo.svg" alt="Sqooli Logo" className="h-12 mb-6" />
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        What curriculums do you offer?
      </h1>

      <p className="text-sm text-gray-500 mb-10 text-center max-w-md">
        {role === "SchoolAdmin"
          ? "Select all that apply"
          : "Select one curriculum"}
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

      <div className="mt-16 flex gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-full font-bold shadow-sm hover:shadow-md transition-shadow"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <button
          onClick={handleNext}
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
