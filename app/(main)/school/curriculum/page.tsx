"use client";
import { link } from "fs";
import React from "react";
import { useRouter } from "next/navigation";

const CurriculumSubjects = () => {
  const router = useRouter();
  const curriculums = [
    {
      id: 1,
      name: "Competence-Based Curriculum (CBC)",
      logo: "CBC",
      grades: "8-4-4",
      gradeLabel: "8-4-4",
      tutors: 45,
      students: 45,
      link: "/school/curriculum/cbc",
      lessons: { published: 45, pending: 45 },
    },
    {
      id: 2,
      name: "8-4-4",
      logo: "CBC",
      grades: "8-4-4",
      gradeLabel: "8-4-4",
      tutors: 45,
      students: 45,
      link: "/school/curriculum/8-4-4",
      lessons: { published: 45, pending: 45 },
    },
    {
      id: 3,
      name: "Cambridge",
      logo: "CAMBRIDGE",
      grades: null,
      tutors: 45,
      students: 45,
      link: "/school/curriculum/cambridge",
      lessons: { published: 45, pending: 45 },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-0.5">
            Curriculum & Subjects
          </h1>
          <p className="text-xs text-gray-600">
            Set up curriculum and subject details.
          </p>
        </div>

        {/* Curriculum Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {curriculums.map((curriculum) => (
            <div
              key={curriculum.id}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              {/* Header with Logo and Grades */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-2.5">
                  {/* Logo */}
                  {curriculum.logo === "CBC" ? (
                    <div className="w-9 h-9 bg-gray-900 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="grid grid-cols-3 gap-0.5">
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                      </div>
                    </div>
                  ) : curriculum.logo === "CAMBRIDGE" ? (
                    <div className="w-9 h-9 bg-white border border-red-700 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-2 h-2 bg-red-700"></div>
                        <div className="w-2 h-2 bg-red-700"></div>
                        <div className="w-2 h-2 bg-red-700"></div>
                        <div className="w-2 h-2 bg-red-700"></div>
                      </div>
                    </div>
                  ) : null}

                  {/* Name */}
                  <div className="pt-0.5">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                      {curriculum.name}
                    </h3>
                  </div>
                </div>

                {/* Grades Badge */}
                {curriculum.gradeLabel && (
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap">
                    {curriculum.gradeLabel}
                  </span>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-[10px] text-gray-500 mb-1">Tutors</div>
                  <div className="text-base font-semibold text-gray-900">
                    {curriculum.tutors}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 mb-1">Students</div>
                  <div className="text-base font-semibold text-gray-900">
                    {curriculum.students}
                  </div>
                </div>
              </div>

              {/* Lessons and View Button */}
              <div className="flex items-end justify-between pt-3 border-t border-gray-200">
                <div className="flex items-baseline gap-4">
                  <div>
                    <div className="text-[10px] text-gray-500 mb-0.5">
                      Lessons
                    </div>
                    <div className="text-[11px] font-normal text-gray-900">
                      {curriculum.lessons.published} Published
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 pb-0.5">
                    {curriculum.lessons.pending} Pending
                  </div>
                </div>
                <button
                  onClick={() => router.push(curriculum.link)}
                  className="text-blue-600 hover:text-blue-700 text-[11px] font-normal pb-0.5"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumSubjects;
