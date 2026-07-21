"use client";

import { getAllUploadResources } from "@/app/helpers/lookups";
import { useResourceStore } from "@/app/store/useResourceStore";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ResourceTableProps {
  // Define any props you need here
  ResourceType: string;
}
function ResourceUploadsTable({ ResourceType }: ResourceTableProps) {
  const router = useRouter();
  const { setActiveResource } = useResourceStore();

  const [resources, setResources] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      const data = await getAllUploadResources(ResourceType);
      console.log("fetched resource", data);
      setResources(data);
    };

    fetchResources();
  }, []);

  const handleEdit = (resource: any) => () => {
    setActiveResource(resource);
    if (ResourceType == "Note") {
      router.push("/school/resources/notes/create-note");
    }
    if (ResourceType == "Book") {
      router.push("/school/resources/books/create-book");
    }

    if (ResourceType == "Video") {
      router.push("/school/resources/videos/create-video");
    }

    if (ResourceType == "Short") {
      router.push("/school/resources/shorts/create-short");
    }
  };

  // Filter resources based on search term
  const filteredresources = resources.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{ResourceType}s</h1>
          <button
            onClick={() => {
              setActiveResource(null);
              //   router.push("/school/resources/resources/create-resource");

              if (ResourceType == "Note") {
                router.push("/school/resources/notes/create-note");
              }
              if (ResourceType == "Book") {
                router.push("/school/resources/books/create-book");
              }

              if (ResourceType == "Video") {
                router.push("/school/resources/videos/create-video");
              }

              if (ResourceType == "Short") {
                router.push("/school/resources/shorts/create-short");
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            + Create New
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-md px-3 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button className="pb-2 border-b-2 border-blue-600 font-medium">
            Active
          </button>
          <button className="pb-2 text-gray-500">Inactive</button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-500">
                <th className="p-4">{ResourceType} Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Created By</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredresources.map((a) => (
                <tr key={a?.id} className="border-b last:border-none">
                  <td className="p-4 font-medium">{a?.title}</td>
                  <td className="p-4 font-medium">
                    <div
                      dangerouslySetInnerHTML={{ __html: a?.resourceType }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                        {a?.creator?.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{a?.creator?.name}</div>
                        <div className="text-xs text-gray-500">
                          {a?.creator?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={handleEdit(a)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredresources.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No resources found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ResourceUploadsTable;
