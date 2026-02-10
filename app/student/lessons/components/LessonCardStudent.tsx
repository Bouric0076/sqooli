import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type LessonStatus = "Active" | "Inactive";
export type ViewMode = "grid" | "list";

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  status: LessonStatus;
}

interface LessonCardProps {
  lesson: Lesson;
  viewMode: ViewMode;
}

export default function LessonCardStudent({
  lesson,
  viewMode,
}: LessonCardProps) {
  const { activeLesson, setActiveLesson, clearActiveLesson } =
    useCurriculumStore();
  const router = useRouter();

  const handleViewLesson = (lesson: Lesson) => {
    clearActiveLesson();
    setActiveLesson({ id: lesson.id, title: lesson.title });

    // router.push(`/school/curriculum/cbc/lessons/create-lesson`);
  };
  const handleJoinLesson = (lesson: Lesson) => {
    // For demonstration, we'll just alert. Replace with actual join logic.
    window.open(lesson.subtitle, "_blank");
  };

  if (viewMode === "list") {
    return (
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-24 overflow-hidden rounded-md border-2 border-[#f4c430]">
            <Image
              src={lesson?.image}
              alt={lesson?.title}
              width={96}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {lesson?.title}
            </h3>
            {lesson?.payment_status !== "PendingPayment" && (
              <p className="text-xs text-gray-500">{lesson?.payment_status}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Updated {lesson?.updatedAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleViewLesson(lesson)}
            className="rounded-md border px-3 py-1 text-xs hover:bg-gray-100"
          >
            View
          </button>
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    );
  }

  /* GRID VIEW (default) */
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {lesson?.title}
          </h3>
          {lesson?.payment_status !== "PendingPayment" && (
            <p className="text-xs text-gray-500">{lesson?.payment_status}</p>
          )}
        </div>
        <MoreVertical className="h-5 w-5 text-gray-400" />
      </div>

      <div className="mb-4 overflow-hidden rounded-lg border-4 border-[#f4c430]">
        <img
          src={lesson?.image}
          alt={lesson?.title}
          width={400}
          height={200}
          className="h-[140px] w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>
          <p>Date Created: {lesson?.createdAt}</p>
          <p>Last Updated: {lesson?.updatedAt}</p>
        </div>
        <div>
          <button
            onClick={() => handleJoinLesson(lesson)}
            className="rounded-md border px-3 py-1 mr-2 bg-blue-500 text-white font-medium hover:bg-gray-100"
          >
            Join Class
          </button>

          <button
            onClick={() => handleViewLesson(lesson)}
            className="rounded-md border px-3 py-1 font-medium hover:bg-gray-100"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
