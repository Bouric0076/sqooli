"use client";
import GeneralBreadcrumb from "@/app/components/ui/navigation/GeneralBreadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { getAllAssignments } from "@/app/helpers/lookups";
import { useAssignmentStore } from "@/app/store/useAssignmentStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ResourceTable from "../partials/ResourceTable";

function Page() {
  return (
    <>
      <GeneralBreadcrumb
        items={[
          { label: "Resource Management", href: "/school/resources" },
          { label: "Assignments", href: "/school/resources/assignments" },
        ]}
      />

      <PageHeader
        title="Assignments Management"
        description="Manage school resources such as assignments, exams, books etc"
      />

      <ResourceTable ResourceType="Assignment" />
    </>
  );
}

export default Page;
