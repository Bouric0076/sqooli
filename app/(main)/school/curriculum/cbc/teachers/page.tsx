"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Grid,
  List,
  MoreVertical,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Layers,
} from "lucide-react";

import { Teacher, getTeachers } from "@/app/helpers/lookups";

import PageHeader from "@/app/components/ui/navigation/PageHeader";
import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";
import TeacherListing from "../../partials/TeacherListing";
import RecruitTeacherModal from "../partials/RecruitTeacherModal";

const CBCTeachersView = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then((data) => {
        setTeachers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading teachers...</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Header */}
      <PageHeader
        title="Competence-Based Curriculum"
        description="Manage details about this curriculum"
      />

      {/* Tabs and Actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-gray-900 select-none">
            Teachers
          </h4>

          <RecruitTeacherModal />
        </div>

        <TeacherListing teachers={teachers} />
        {/* Search and View Toggle */}
      </div>
    </div>
  );
};

export default CBCTeachersView;
