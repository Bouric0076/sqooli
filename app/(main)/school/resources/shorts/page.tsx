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
          { label: "Shorts", href: "/school/resources/shorts" },
        ]}
      />

      <PageHeader
        title="Video Shorts Management"
        description="Manage school resources such as assignments, exams, books etc"
      />

      <ResourceUploadsTable ResourceType="Short" />
    </>
  );

  // return (

  //   <div className="min-h-screen p-16">
  //     <ResourceUploadComponent
  //       resourceType="Note"
  //       titleLabel="Notes Name"
  //       uploadLabel="Upload Notes"
  //       activeCurriculumId={activeCurriculum.id}
  //       onSuccess={(id) => console.log("Resource created:", id)}
  //     />
  //   </div>
  // );
}
