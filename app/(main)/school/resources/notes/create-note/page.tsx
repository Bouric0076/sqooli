"use client";
import React, { use, useEffect } from "react";
import ResourceUploadComponent from "../../partials/ResourceUploadComponent";
import { useResourceStore } from "@/app/store/useResourceStore";
import GeneralBreadcrumb from "@/app/components/ui/navigation/GeneralBreadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

function page() {
  const { activeResource } = useResourceStore();
  const [id, activeResourceId] = React.useState<number>(0);

  useEffect(() => {
    if (activeResource?.id && activeResource.id !== id) {
      activeResourceId(activeResource.id);
    }
  }, [activeResource?.id, id]);

  return (
    <>
      <GeneralBreadcrumb
        items={[
          { label: "Resource Management", href: "/school/resources" },
          { label: "Notes", href: "/school/resources/notes" },
        ]}
      />

      <PageHeader
        title="Notes Management"
        description="Add basic Information about your resource"
      />
      <div className="min-h-screen p-8">
        <ResourceUploadComponent
          resourceType={"Note"}
          activeResourceId={id}
          titleLabel={"Notes Name"}
          uploadLabel={"Upload Notes"}
        />
      </div>
    </>
  );
}

export default page;
