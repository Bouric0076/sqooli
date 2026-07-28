"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { errorShow } from "@/lib/errorHandler";

interface Curriculum {
  id: number;
  name: string;
  acronym: string;
  teachersCount: number;
  studentsCount: number;
  publishedLessons: number;
  pendingLessons: number;
}

const CurriculumSubjects = () => {
  const router = useRouter();
  const activeSchool = useAuthStore((state) => state.activeSchool);

  const schoolId = activeSchool?.id;

  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setActiveCurriculum = useCurriculumStore(
    (state) => state.setActiveCurriculum
  );
  useEffect(() => {
    if (!schoolId) return; // ⛔ Wait until schoolId exists

    const fetchCurriculums = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/school/${schoolId}`, {
          credentials: "include", // httpOnly cookie
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to load curriculums");
        }

        const data = await res.json();
        setCurriculums(data.curriculums || []);
      } catch (err: any) {
          errorShow(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculums();
  }, [schoolId]);

  const handleViewCurriculum = (curriculum: Curriculum) => {
    setActiveCurriculum({
      id: curriculum.id,
      name: curriculum.name,
      acronym: curriculum.acronym,
    });

    router.push(`/school/curriculum/${curriculum.name.toLowerCase()}`);
  };

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

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-sm text-gray-500">
            Loading curriculums…
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {curriculums.map((curriculum) => (
              <div
                key={curriculum.id}
                className="bg-white rounded-lg shadow-sm p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-2.5">
                    {curriculum.acronym === "CBC" ? (
                      <div className="w-9 h-9 bg-gray-900 rounded flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-0.5">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <span
                              key={i}
                              className="w-1 h-1 bg-white rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-9 h-9 bg-gray-300 rounded flex items-center justify-center text-[10px] font-semibold">
                        {curriculum.acronym}
                      </div>
                    )}

                    <h3 className="text-sm font-semibold text-gray-900">
                      {curriculum.name}
                    </h3>
                  </div>

                  <span className="bg-orange-100 text-orange-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {curriculum.acronym}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[10px] text-gray-500">Tutors</div>
                    <div className="text-base font-semibold">
                      {curriculum.teachersCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Students</div>
                    <div className="text-base font-semibold">
                      {curriculum.studentsCount}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-3 border-t">
                  <div>
                    <div className="text-[11px]">
                      {curriculum.publishedLessons} Published
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {curriculum.pendingLessons} Pending
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewCurriculum(curriculum)}
                    className="text-blue-600 text-[11px]"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumSubjects;
