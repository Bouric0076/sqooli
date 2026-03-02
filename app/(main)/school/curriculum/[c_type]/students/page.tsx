"use client";
import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { getStudents, getTeachers, Student } from "@/app/helpers/lookups";
import React, { useEffect, useState } from "react";

import RecruitTeacherModal from "../partials/RecruitTeacherModal";
import StudentListing from "../../partials/StudentListing";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";

function page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeCurriculum } = useCurriculumStore();

  useEffect(() => {
    getStudents({
      curriculumId: activeCurriculum?.id,
    })
      .then((data) => {
        console.log("Fetched students:", data);
        setStudents(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading students...</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Header */}
      <PageHeader
        title={activeCurriculum?.acronym || ""}
        description="Manage details about this curriculum"
      />

      {/* Tabs and Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-gray-900 select-none">
            Students
          </h4>
        </div>

        <StudentListing students={students} />
        {/* Search and View Toggle */}
      </div>
    </div>
  );
}
export default page;
