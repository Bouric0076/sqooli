"use client";

import GeneralBreadcrumb from "@/app/components/ui/navigation/GeneralBreadcrumb";
import ResourceUploadComponent from "../partials/ResourceUploadComponent";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import ResourceTable from "../partials/ResourceTable";
import ResourceUploadsTable from "../partials/ResourceUploadsTable";

export default function Page() {
  return (
    <>
      <GeneralBreadcrumb
        items={[
          { label: "Resource Management", href: "/school/resources" },
          { label: "Notes", href: "/school/resources/notes" },
        ]}
      />

      <PageHeader
        title="Assignments Management"
        description="Manage school resources such as assignments, exams, books etc"
      />
      <ResourceUploadsTable ResourceType="Note" />
    </>
  );
}
