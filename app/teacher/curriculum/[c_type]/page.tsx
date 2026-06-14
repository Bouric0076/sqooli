"use client";

import { useEffect, useMemo, useState } from "react";

import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

import { getLessons } from "@/app/helpers/lookups";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import LessonCard, { Lesson, ViewMode } from "@/app/(main)/school/curriculum/[c_type]/lessons/components/LessonCard";
import AddLessonModal from "@/app/(main)/school/curriculum/[c_type]/lessons/partials/AddLessonModal";
import LessonsHeader from "@/app/(main)/school/curriculum/[c_type]/lessons/components/LessonsHeader";
import LessonCardTeacher from "../../lessons/components/LessonCardTeacher";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const { activeCurriculum } = useCurriculumStore();

  useEffect(() => {
    getLessons({
      curriculumId: activeCurriculum?.id,
    })
      .then((data) => {
        const apiLessons: Lesson[] = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          subtitle: item.link,
          createdAt: new Date(item.created_at).toLocaleDateString(),
          updatedAt: new Date(item.start).toLocaleTimeString(),
          image:
            "https://www.teachingenglish.org.uk/sites/teacheng/files/RS7853_ThinkstockPhotos-827490826-hig.jpg",
          status: item.isApproved ? "Active" : "Inactive",
        }));
        setLessons(apiLessons);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLessons = useMemo(() => {
    return lessons.filter(
      (l) =>
        l.status === status &&
        l.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [lessons, search, status]);

  return (
    <div className="h-screen">
      <Breadcrumb />

      <PageHeader
        title={activeCurriculum?.acronym || ""}
        description="Manage lessons about this curriculum"
      />

      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <AddLessonModal link="teacher" />
        <LessonsHeader
          onSearchChange={setSearch}
          onViewModeChange={setViewMode}
          onStatusChange={setStatus}
        />

        {loading ? (
          <p className="text-gray-500 py-4">Loading lessons...</p>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {filteredLessons.map((lesson) => (
              <LessonCardTeacher key={lesson.id} lesson={lesson} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
