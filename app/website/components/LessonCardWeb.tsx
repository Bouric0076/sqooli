import { Teacher } from "@/app/helpers/lookups";
import { getLessonBasicInfo } from "@/app/lib/lessonContent";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { MoreVertical, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { renderStars } from "./renderStars";

export type LessonStatus = "Active" | "Inactive";
export type ViewMode = "grid" | "list";

export interface Lesson {
  id: number;
  title: string;
  subtitle: string; // e.g "April 2026"
  image: string;
  price: number;
  school: string; // teacher name
  rating?: number; // 4.5
  startedAt: string;
  status: LessonStatus;
}

interface LessonCardProps {
  lessonId: number;
  viewMode: ViewMode;
  item?: Lesson;
}

export default function LessonCardWeb({ lessonId, viewMode, item }: LessonCardProps) {
  const { setActiveLesson, clearActiveLesson } = useCurriculumStore();
  const [assignedTeacher, setAssignedTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!lessonId) return;

    setLoading(true);
    getLessonBasicInfo(lessonId)
      .then((res) => {
        setLesson(res.data);
        if (res.data.assignedTeacher) {
          setAssignedTeacher(res.data.assignedTeacher);
        } else {
          setAssignedTeacher(null);
        }
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handleBookLesson = () => {
    clearActiveLesson();
    setActiveLesson({ id: lesson.id, title: lesson.title });
    router.push(`/student/booking/lesson`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  return (
                <div className="tutor-card" key={item.id}>
              <div className="tutor-card-header">
                <h3 className="tutor-name">{item.title}</h3>
                <button className="more-btn" onClick={() => alert('Options menu clicked')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <div className="tutor-tags">
                {item?.tags?.map((tag, index) => (
                  <span className="tag-badge" key={index}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="tutor-image-container">
                <img 
                  className="tutor-image" 
                  src={item?.image} 
                  alt={item?.name} 
                  loading="lazy" 
                />
              </div>

              <div className="tutor-card-footer">
                <div className="tutor-stats">
                  <div className="rating-container">
                    <span className="rating-value">{item?.rating?.toFixed(1)}</span>
                    <div className="stars-row">
                      {renderStars(item?.rating)}
                    </div>
                  </div>
                  <span className="lessons-taught">{item?.lessons}</span>
                </div>
                
                <button 
                  className="btn-connect" 
                  onClick={handleBookLesson}
                >
                  Connect
                </button>
              </div>
            </div>
  )



  

  /* LIST VIEW (simple) */
  if (viewMode === "list") {
    return (
      <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src="https://www.teachingenglish.org.uk/sites/teacheng/files/RS7853_ThinkstockPhotos-827490826-hig.jpg"
            alt={lesson?.name}
            width={96}
            height={64}
            className="rounded-md object-cover border-2 border-yellow-400"
          />
          <div>
            <h3 className="font-semibold">{lesson?.name}</h3>
            <p className="text-xs text-gray-500">
              {" "}
              {lesson?.date ? formatDate(lesson.date) : ""}
            </p>
          </div>
        </div>
        <button
          onClick={handleBookLesson}
          className="rounded-full border px-4 py-1 text-sm hover:bg-gray-100"
        >
          Book
        </button>
      </div>
    );
  }

  /* GRID VIEW (MATCH IMAGE) */
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md border border-gray-100">
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className=" font-bold text-gray-900">{lesson?.name}</h3>
          <p className="text-sm font-semibold text-gray-800">
            {lesson?.date ? formatDate(lesson.date) : ""} {lesson?.start}
          </p>
        </div>
        <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
      </div>

      {/* Image */}
      <div className="mb-3 overflow-hidden rounded-lg border-8 border-yellow-400">
        <img
          src="https://www.teachingenglish.org.uk/sites/teacheng/files/RS7853_ThinkstockPhotos-827490826-hig.jpg"
          alt={lesson?.name}
          width={400}
          height={200}
          className="h-[140px] w-full object-cover"
        />
      </div>

      {/* Teacher */}
      <p className="text-sm font-medium text-gray-800">{lesson?.school}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
        <span className="font-medium">{lesson?.rating ?? 4.5}</span>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>

      {/* Price + Button */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">
          KES {lesson?.price?.toFixed(2)}
        </p>

        <button
          onClick={handleBookLesson}
          className="rounded-full border px-4 py-1 text-xs font-medium hover:bg-gray-100"
        >
          Book a Slot
        </button>
      </div>
    </div>
  );
}
