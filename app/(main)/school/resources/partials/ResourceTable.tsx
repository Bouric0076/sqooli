"use client";
import { getAllAssignments } from "@/app/helpers/lookups";
import { useAssignmentStore } from "@/app/store/useAssignmentStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ResourceTableProps {
  // Define any props you need here
  ResourceType: string;
}
function ResourceTable({ ResourceType }: ResourceTableProps) {
  const router = useRouter();
  const { setActiveAssignment } = useAssignmentStore();

  const [assignments, setAssignments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await getAllAssignments(ResourceType);
      console.log("fetched resource", data);
      setAssignments(data);
    };

    fetchAssignments();
  }, []);

  const handleEdit = (assignment: any) => () => {
    setActiveAssignment(assignment);
    if (ResourceType == "Assignment") {
      router.push("/school/resources/assignments/create-assignment");
    }
    if (ResourceType == "Exam") {
      router.push("/school/resources/exams/create-exam");
    }

    if (ResourceType == "Quiz") {
      router.push("/school/resources/quizzes/create-quiz");
    }
    // router.push("/school/resources/assignments/create-assignment");
  };

  // Filter assignments based on search term
  const filteredAssignments = assignments.filter((a) =>
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
              setActiveAssignment(null);
              //   router.push("/school/resources/assignments/create-assignment");

              if (ResourceType == "Assignment") {
                router.push("/school/resources/assignments/create-assignment");
              }
              if (ResourceType == "Exam") {
                router.push("/school/resources/exams/create-exam");
              }

              if (ResourceType == "Quiz") {
                router.push("/school/resources/quizzes/create-quiz");
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
              {filteredAssignments.map((a) => (
                <tr key={a?.id} className="border-b last:border-none">
                  <td className="p-4 font-medium">{a?.title}</td>
                  <td className="p-4 font-medium">
                    <div dangerouslySetInnerHTML={{ __html: a?.description }} />
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
              {filteredAssignments.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No assignments found.
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

export default ResourceTable;
