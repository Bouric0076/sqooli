"use client";

import { useEffect, useMemo, useState } from "react";

import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

import { getBookingLessons, getLessons } from "@/app/helpers/lookups";
import { Lesson } from "../store/useCurriculumStore";
import LessonCardWeb, { ViewMode } from "../website/components/LessonCardWeb";

import { useSpinnerStore } from "../store/useSpinnerStore";
import LessonsList from "../website/components/LessonList";
import SqooliLandingPage from "../website/page";

export default function Home() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
   const { loading, setLoading } =
     useSpinnerStore();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    setLoading(true);

    getLessons()
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
      <div className="">

        
             <SqooliLandingPage />
     
          </div>
    
    </div>
  );
}
