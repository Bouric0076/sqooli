"use client";

import { useEffect, useMemo, useState } from "react";
import LessonsHeader from "./components/LessonsHeader";
import LessonCard, { Lesson, ViewMode } from "./components/LessonCard";
import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import AddLessonModal from "./partials/AddLessonModal";
import { getLessons } from "@/app/helpers/lookups";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    getLessons()
      .then((data) => {
        const apiLessons: Lesson[] = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          subtitle: item.link,
          createdAt: new Date(item.created_at).toLocaleDateString(),
          updatedAt: new Date(item.start).toLocaleTimeString(),
          image:
            "https://www.teachingenglish.org.uk/sites/teacheng/files/RS7853_ThinkstockPhotos-827490826-hig.jpg",
          status: item.status === "Pending" ? "Inactive" : item.status,
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
        title="Competence-Based Curriculum"
        description="Manage lessons about this curriculum"
      />

      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <AddLessonModal />
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
              <LessonCard key={lesson.id} lesson={lesson} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
