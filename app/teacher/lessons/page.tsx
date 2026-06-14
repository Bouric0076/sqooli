"use client";

import { useEffect, useMemo, useState } from "react";

import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

import { getBookingLessons, getLessons } from "@/app/helpers/lookups";
import { Lesson } from "@/app/store/useCurriculumStore";
import LessonCard, {
  ViewMode,
} from "@/app/(main)/school/curriculum/[c_type]/lessons/components/LessonCard";
import LessonsHeader from "@/app/(main)/school/curriculum/[c_type]/lessons/components/LessonsHeader";
import AddLessonModal from "@/app/(main)/school/curriculum/[c_type]/lessons/partials/AddLessonModal";
import LessonCardTeacher from "./components/LessonCardTeacher";

export default function LessonsList() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    getLessons()
      .then((data) => {
        // console.log("API Lessons Data:", data);
        const apiLessons: Lesson[] = data.map((item: any) => ({
          id: item.id,
          payment_status: item?.status,
          title: item?.name,
          subtitle: item.meetingLink,
          date: item?.date,
          createdAt: item.start,
          updatedAt: item.end,
          curriculum: item?.curriculum?.acronym || "cbc",
          image:
            "https://www.teachingenglish.org.uk/sites/teacheng/files/RS7853_ThinkstockPhotos-827490826-hig.jpg",
          status: item.isApproved ? "Active" : "Inactive",
          payment: item?.payment,
          lesson: item?.lesson,
        }));
        setLessons(apiLessons);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons;
  }, [lessons, search, status]);

  //  console.log("Filtered Lessons:", filteredLessons);

  return (
    <div className="h-screen w-full">
      <div className="bg-white px-6 py-3">
        {loading ? (
          <p className="text-gray-500 py-4">Loading lessons...</p>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-8  grid-cols-3 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {filteredLessons.map((lesson) => (
              <LessonCardTeacher
                key={lesson.id}
                lesson={lesson}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
