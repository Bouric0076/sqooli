"use client";

import { useEffect, useMemo, useState } from "react";

import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

import { getBookingLessons, getLessons } from "@/app/helpers/lookups";
import { Lesson } from "../store/useCurriculumStore";
import { ViewMode } from "../website/components/LessonCardWeb";
import LessonCard from "./school/curriculum/cbc/lessons/components/LessonCard";

export default function Home() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    getBookingLessons()
      .then((data) => {
        console.log("API Lessons Data:", data);
        const apiLessons: Lesson[] = data.map((item: any) => ({
          id: item.id,
          payment_status: item?.status,
          title: item?.lesson?.name,
          subtitle: item.meetingLink,
          createdAt: new Date(item.start).toLocaleDateString(),
          updatedAt: new Date(item.end).toLocaleTimeString(),
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

  return (
    <div className="h-screen">
      <div className="bg-white border-b border-gray-200 px-6 py-3">
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
