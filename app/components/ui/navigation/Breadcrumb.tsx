"use client";

import { usePathname } from "next/navigation";
import { Layers } from "lucide-react";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";

type BreadcrumbMap = {
  [key: string]: string;
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const { activeLesson, activeCurriculum } = useCurriculumStore();

  // alert(activeCurriculum?.name);
  /**
   * Map route segments to labels
   * Extend this freely without touching UI
   */
  const labelMap: BreadcrumbMap = {
    curriculum: "Curriculum & Subjects",
    cbc: activeCurriculum?.name || "CBC",
    teachers: "Teachers",
    students: "Students",
    lessons: "Lessons",
    "extra-curricula": "Extra Curricula",
    schedule: "Schedule",
  };

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => labelMap[seg]);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-2 text-xs text-gray-600 select-none">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <div key={segment} className="flex items-center gap-2">
              {index === 0 && (
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {labelMap[segment]}
                </span>
              )}

              {index > 0 && (
                <>
                  <span>›</span>
                  <span
                    className={
                      isLast ? "text-blue-600 font-semibold" : "text-gray-600"
                    }
                  >
                    {labelMap[segment]}{" "}
                    {activeLesson && isLast ? `> ${activeLesson.title}` : ""}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
