"use client";

import { useState } from "react";
import {
  PlusCircle,
  Calendar,
  Users,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Programme {
  id: string;
  name: string;
  type: string;
  curriculum: string;
  startDate: string;
  endDate: string;
  status: "Draft" | "Pending Approval" | "Published";
  enrolled: number;
  revenue: number;
}

export default function ProgramsPage() {
  const router = useRouter();
  const [programmes] = useState<Programme[]>([
    {
      id: "1",
      name: "Term 1 – 2026",
      type: "Public Programme",
      curriculum: "CBC",
      startDate: "2026-01-10",
      endDate: "2026-04-05",
      status: "Published",
      enrolled: 320,
      revenue: 450000,
    },
    {
      id: "2",
      name: "April Holiday Booster",
      type: "Tuition Programme",
      curriculum: "8-4-4",
      startDate: "2026-04-10",
      endDate: "2026-04-30",
      status: "Pending Approval",
      enrolled: 120,
      revenue: 95000,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Programme Management
          </h1>
          <p className="text-gray-500 text-sm">
            Create, manage and monitor all academic programmes
          </p>
        </div>

        <button
          onClick={() => router.push("/school/programs/create")}
          className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600 transition"
        >
          <PlusCircle size={18} />
          Create Programme
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard icon={<Calendar />} label="Active Programmes" value="2" />
        <StatCard icon={<Users />} label="Total Enrollments" value="1,420" />
        <StatCard
          icon={<DollarSign />}
          label="Revenue Generated"
          value="KES 2.3M"
        />
        <StatCard icon={<ShieldCheck />} label="Pending Approvals" value="1" />
      </div>

      {/* Programme Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">All Programmes</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Programme Name</th>
              <th className="text-left px-6 py-3">Type</th>
              <th className="text-left px-6 py-3">Curriculum</th>
              <th className="text-left px-6 py-3">Duration</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Enrolled</th>
              <th className="text-right px-6 py-3">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {programmes.map((programme) => (
              <tr
                key={programme.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {programme.name}
                </td>
                <td className="px-6 py-4">{programme.type}</td>
                <td className="px-6 py-4">{programme.curriculum}</td>
                <td className="px-6 py-4">
                  {programme.startDate} → {programme.endDate}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={programme.status} />
                </td>
                <td className="px-6 py-4 text-right">{programme.enrolled}</td>
                <td className="px-6 py-4 text-right font-semibold">
                  KES {programme.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <div className="flex justify-between items-center text-gray-500">
        <span>{label}</span>
        <span className="text-indigo-600">{icon}</span>
      </div>
      <div className="text-2xl font-bold mt-4 text-gray-800">{value}</div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "Draft" | "Pending Approval" | "Published";
}) {
  const styles = {
    Draft: "bg-gray-200 text-gray-600",
    "Pending Approval": "bg-yellow-100 text-yellow-700",
    Published: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}
