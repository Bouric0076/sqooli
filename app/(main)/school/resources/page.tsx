import GeneralBreadcrumb from "@/app/components/ui/navigation/GeneralBreadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import React from "react";

function page() {
  const assignments = [
    {
      name: "Introduction to maths assignment",
      program: "First term January 2026",
      grade: "Lower Primary ",
      creator: "Sqooli Admin",
      email: "admin@sqooli.com",
      completed: 50,
    },
  ];
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
        description="Manage school resources such as assignments,exams,books etc"
      />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Assignments</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            + Create New
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="w-full border rounded-md px-3 py-2"
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
                <th className="p-4">Assignment Name</th>
                <th className="p-4">Program</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Completed</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.name} className="border-b last:border-none">
                  <td className="p-4 font-medium">{a.name}</td>
                  <td className="p-4">{a.program}</td>
                  <td className="p-4">{a.grade}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                        {a.creator[0]}
                      </div>
                      <div>
                        <div className="font-medium">{a.creator}</div>
                        <div className="text-xs text-gray-500">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{a.completed}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default page;
