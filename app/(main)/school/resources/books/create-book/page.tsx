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
          { label: "Books", href: "/school/resources/books" },
        ]}
      />

      <PageHeader
        title="Books Management"
        description="Add basic Information about your resource"
      />
      <div className="min-h-screen p-8">
        <ResourceUploadComponent
          resourceType={"Book"}
          activeResourceId={id}
          titleLabel={"Book Name"}
          uploadLabel={"Upload Book"}
        />
      </div>
    </>
  );
}

export default page;
