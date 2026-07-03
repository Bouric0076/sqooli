"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

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

  return (
    <div>
<div className=" " style={{marginBottom:10}}>
  <div className="relative w-full ">
<input
style={{padding:20}}
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search lessons..."
  className="w-full h-11 rounded-xl border border-gray-300 bg-white pl-5 pr-11 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
/>

    <Search className="pointer-events-none absolute right-4  top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
  </div>
</div>

      <div className="cards-grid ">
        {filteredLessons.map((item) => (
          <LessonCardWeb key={item.id} lessonId={item.id} item={item} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}