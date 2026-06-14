"use client";

import { useEffect, useMemo, useState } from "react";

import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

import { getLessons } from "@/app/helpers/lookups";
import { Lesson } from "@/app/store/useCurriculumStore";
import LessonCard, {
  ViewMode,
} from "@/app/(main)/school/curriculum/[c_type]/lessons/components/LessonCard";
import LessonsHeader from "@/app/(main)/school/curriculum/[c_type]/lessons/components/LessonsHeader";
import AddLessonModal from "@/app/(main)/school/curriculum/[c_type]/lessons/partials/AddLessonModal";
import LessonCardWeb from "./LessonCardWeb";
import { renderStars } from "./renderStars";

const tutorPortrait = './teacher.jpg';
export default function LessonsList() {
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
          image: "https://www.teachingenglish.org.uk/sites/teacheng/files/RS7853_ThinkstockPhotos-827490826-hig.jpg",
          status: item.isApproved ? "Active" : "Inactive",
          rating: 4.9,
          tags: ['Math', 'Eng', 'Physics'], 
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




  return(
            <div className="cards-grid">
          {filteredLessons.map((item) => (
<LessonCardWeb key={item.id} lessonId={item.id} item={item} viewMode={viewMode} />
          ))}
        </div>
  );

  // return (
  //   <div className="h-screen w-full">
  //     <div className="bg-white  border-gray-200 px-6 py-3">
  //       {loading ? (
  //         <p className="text-gray-500 py-4">Loading lessons...</p>
  //       ) : (
  //         <div
  //           className={
  //             viewMode === "grid"
  //               ? "grid grid-cols-1 gap-8  grid-cols-3 sm:grid-cols-2 lg:grid-cols-3"
  //               : "flex flex-col gap-4"
  //           }
  //         >
  //           {filteredLessons.map((lesson) => (
  //             <LessonCardWeb
  //               key={lesson.id}
  //               lessonId={lesson.id}
  //               viewMode={viewMode}
  //             />
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
