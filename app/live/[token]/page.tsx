"use client";

import { getLessonStatus } from "@/app/lib/lessonLive";
import { useAuthStore } from "@/app/store/useAuthStore";
import LiveClassroom from "@/components/LiveClassroom";
import { LessonLoader } from "@/components/ui/LessonLoader";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LiveClassPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user);
  const role = user?.userType === "Teacher" ? "Teacher" : "Student";
  const [lessonId, setLessonId] = useState(null);
  const [isStarted, setIstarted] = useState(false);

  const token = params.token as string;
  const jwt = searchParams.get("jwt");

  const checkStatus = async () => {
    try {
      const res = await getLessonStatus(token);

      // console.log("Lesson status response:", res.data.id);
      const data = await res.data;

      console.log("Lesson status data:", data);
      if (data.id) {
        // console.log("Lesson has started");

        setLessonId(data.id);
        setIstarted(data.started);
      }
    } catch (err) {
      console.error("Failed to fetch lesson status", err);
    }
  };

  useEffect(() => {
    checkStatus(); // initial load
  }, []);

  console.log("LiveClassPage token:", token);

  return (
    <div className="h-screen w-full">
      {!lessonId && <LessonLoader />}

      {role && lessonId && (
        <LiveClassroom
          roomToken={token}
          jwt={jwt}
          role={role}
          lessonId={lessonId}
        />
      )}
    </div>
  );
}
