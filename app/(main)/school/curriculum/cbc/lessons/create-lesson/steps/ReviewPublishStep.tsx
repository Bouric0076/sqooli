import React, { useEffect, useState } from "react";
import { ChevronDown, Edit, PlayCircle, BookOpen, X } from "lucide-react";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { UseFormReturn } from "react-hook-form";
import { AddLessonForm } from "../page";
import {
  assignTeacherToLesson,
  getLessonBasicInfo,
  getLessonContent,
  LessonSection,
  publishLesson,
} from "@/app/lib/lessonContent";
import { getLessonObjectives } from "@/app/lib/lessonObjectives";
import { getTeachers, Teacher } from "@/app/helpers/lookups";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function ReviewPublishStep({ form, lessonId }: Props) {
  const activeCurriculum = useCurriculumStore(
    (state) => state.activeCurriculum
  );

  const [expandedTopic, setExpandedTopic] = useState<number | null>(1);
  const [objectives, setObjectives] = useState<string[]>(["", ""]);
  const [sections, setSections] = useState<LessonSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<any>(null);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTeacher, setSearchTeacher] = useState("");
  const [assigning, setAssigning] = useState(false);

  const [assignedTeacher, setAssignedTeacher] = useState<Teacher | null>(null);
  const [publishing, setPublishing] = useState(false);

  // Notification state
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    getTeachers()
      .then((data) => {
        setTeachers(data);
      })
      .finally(() => setLoading(false));
  }, []);

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

  useEffect(() => {
    if (!lessonId) return;

    setLoading(true);
    getLessonContent(lessonId)
      .then((res) => {
        setSections(res.sections);
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  useEffect(() => {
    if (!lessonId) return;

    const loadObjectives = async () => {
      try {
        const loaded = await getLessonObjectives(lessonId);
        setObjectives(loaded.length ? loaded : ["", ""]);
      } catch (err) {
        console.error("Failed to load objectives", err);
        setObjectives(["", ""]);
      }
    };

    loadObjectives();
  }, [lessonId]);

  const filteredTeachers = teachers.filter((t) =>
    `${t.fullName}`.toLowerCase().includes(searchTeacher.toLowerCase())
  );

  const handleAssignTeacher = async (teacherId: number) => {
    if (!lessonId) return;
    try {
      setAssigning(true);
      var resp = await assignTeacherToLesson(lessonId, teacherId);
      // Assuming the API returns the assigned teacher info on success:
      setAssignedTeacher(teachers.find((t) => t.id === teacherId) || null);
      setNotification({
        type: "success",
        message: "Teacher assigned successfully",
      });
      setShowAssignModal(false);
    } catch (error) {
      setNotification({
        type: "error",
        message: error?.message || "Assignment failed",
      });
      console.error(error);
    } finally {
      setAssigning(false);
    }
  };

  const handlePublish = async () => {
    if (!lessonId) return;

    try {
      setPublishing(true);
      await publishLesson(lessonId);
      setNotification({
        type: "success",
        message: "Lesson published successfully",
      });
      setLesson((prev: any) => ({
        ...prev,
        Status: "Published",
      }));
    } catch (error: any) {
      setNotification({
        type: "error",
        message: error?.message || "Failed to publish lesson",
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full relative">
      {/* Header Banner */}
      {notification && (
        <div
          className={` top-50 right-50 px-5 py-3 rounded shadow-lg text-red  text-sm font-medium z-5000
            ${notification.type === "success" ? "bg-green-600" : "bg-red-600"} 
            animate-fadeInDown`}
          role="alert"
        >
          {notification.message}
        </div>
      )}
      {/* Assign Teacher Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Assign Teacher</h2>

              <button
                onClick={() => setShowAssignModal(false)}
                aria-label="Close modal"
              >
                <X />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search teacher..."
              value={searchTeacher}
              onChange={(e) => setSearchTeacher(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-md"
            />

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredTeachers.length === 0 && (
                <p className="text-sm text-gray-500 text-center">
                  No teachers found
                </p>
              )}
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
                >
                  <span>{teacher?.fullName}</span>
                  <button
                    disabled={assigning}
                    onClick={() => handleAssignTeacher(teacher.id)}
                    className={`px-3 py-1 rounded text-sm text-white ${
                      assigning
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    } flex items-center gap-2`}
                  >
                    {assigning && (
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    )}
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full mx-auto px-6 py-8">
        <div className="bg-linear-to-r from-blue-400 via-blue-300 to-blue-200  py-8 ">
          <div className="w-full mx-auto flex flex-row justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
              {lesson?.subject}
            </h1>
            <div className="flex gap-2">
              {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 shadow-lg transition-colors text-sm font-medium">
                <Edit className="w-4 h-4" />
                Edit
              </button> */}
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 shadow-lg transition-colors text-sm font-medium"
              >
                <Edit className="w-4 h-4" />
                Assign Teacher
              </button>
              {lesson?.assignedTeachers &&
              lesson.assignedTeachers.length > 0 ? (
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 shadow-lg transition-colors text-sm font-medium${
                    publishing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {publishing && (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  Publish
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Assigned Teacher Section */}
        <div className="max-w-6xl mx-auto mb-2 px-6 py-4 bg-white rounded-md shadow-sm mt-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            Assigned Teacher{lesson?.assignedTeachers.length > 1 ? "s" : ""}
          </h3>

          {lesson?.assignedTeachers && lesson.assignedTeachers.length > 0 ? (
            lesson.assignedTeachers.map((assignedTeacher) => (
              <div
                key={assignedTeacher.teacherId}
                className="text-gray-700 text-sm"
              >
                {assignedTeacher.name}{" "}
                {assignedTeacher.email && (
                  <span className="text-gray-500">
                    ({assignedTeacher.email})
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic text-sm">
              No teacher assigned yet.
            </div>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-700 leading-relaxed text-sm">
              {lesson?.description}
            </p>
          </div>

          {/* KES 200/ Lesson Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              KES {lesson?.price}/ Lesson
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button className="py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                About
              </button>
              <button className="py-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Curriculum
              </button>
              <button className="py-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Resources
              </button>
              <button className="py-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Assignments & Exams
              </button>
              <button className="py-4 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Forum
              </button>
            </div>
          </div>

          {/* What you will learn */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              What you will learn
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {objectives?.map((objective, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700 leading-relaxed">
                    {objective}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Topics */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Related Topics
            </h3>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm cursor-pointer transition-colors">
                {lesson?.topic}
              </span>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Physics Form 4 Term 3
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm">
              {lesson?.requirements}
            </p>

            {/* Topic 1 - Expanded */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedTopic(expandedTopic === 1 ? null : 1)}
                className="w-full px-5 py-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 text-base mb-1">
                    Topic 1
                  </h3>
                  <p className="text-sm text-gray-600">4 Lectures · 60 min</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedTopic === 1 ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`border-t border-gray-200 bg-gray-50 overflow-hidden transition-all duration-300 ${
                  expandedTopic === 1
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    What you will learn
                  </h4>
                  {objectives?.map((objective, idx) => (
                    <div className="space-y-2.5 mb-4" key={idx}>
                      <div className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span className="text-sm text-gray-700">
                          {objective}
                        </span>
                      </div>
                    </div>
                  ))}
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Related Topics
                  </h4>
                  <div className="flex gap-2 mb-5">
                    <span className="px-2.5 py-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded text-xs cursor-pointer transition-colors">
                      {lesson?.topic}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Lesson Content
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2.5 px-3 bg-white rounded border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          Video Introduction
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">3.08 min</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 px-3 bg-white rounded border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          Video Production
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">3.08 min</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 px-3 bg-white rounded border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          What you will learn in this lesson
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">3.08 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
