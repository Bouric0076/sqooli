"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  ShieldCheck,
  Clock,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                MAIN PAGE                                   */
/* -------------------------------------------------------------------------- */

export default function ProgramDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data (replace with API later)
  const programme = {
    id,
    name: "Term 1 – 2026",
    type: "School Programme",
    curriculum: "CBC",
    grades: ["Grade 3", "Grade 4"],
    subjects: ["Mathematics", "English", "Science"],
    startDate: "2026-01-10",
    endDate: "2026-04-05",
    status: "Pending Approval",
    totalStudents: 320,
    teacherCount: 8,
    projectedRevenue: 1200000,
    teacherRevenue: 720000,
    platformRevenue: 480000,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{programme.name}</h1>
          <p className="text-sm text-gray-500">Programme ID: {programme.id}</p>
        </div>

        <StatusBadge status={programme.status} />
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={<Users />}
          title="Enrolled Students"
          value={programme.totalStudents}
        />
        <StatCard
          icon={<Users />}
          title="Assigned Teachers"
          value={programme.teacherCount}
        />
        <StatCard
          icon={<DollarSign />}
          title="Projected Revenue"
          value={`KES ${programme.projectedRevenue.toLocaleString()}`}
        />
        <StatCard
          icon={<Calendar />}
          title="Duration"
          value={`${programme.startDate} → ${programme.endDate}`}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow border">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-8">
          {activeTab === "overview" && <OverviewTab programme={programme} />}

          {activeTab === "timetable" && <TimetableTab />}

          {activeTab === "teachers" && <TeachersTab />}

          {activeTab === "finance" && <FinanceTab programme={programme} />}

          {activeTab === "approval" && (
            <ApprovalTab status={programme.status} />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  TABS                                      */
/* -------------------------------------------------------------------------- */

function TabNavigation({ activeTab, setActiveTab }: any) {
  const tabs = ["overview", "timetable", "teachers", "finance", "approval"];

  return (
    <div className="border-b flex space-x-8 px-8 pt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-4 capitalize text-sm font-medium ${
            activeTab === tab
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               OVERVIEW TAB                                 */
/* -------------------------------------------------------------------------- */

function OverviewTab({ programme }: any) {
  return (
    <div className="space-y-8">
      <Section title="Academic Structure" icon={<BookOpen size={18} />}>
        <p>
          <strong>Curriculum:</strong> {programme.curriculum}
        </p>
        <p>
          <strong>Grades:</strong> {programme.grades.join(", ")}
        </p>
        <p>
          <strong>Subjects:</strong> {programme.subjects.join(", ")}
        </p>
      </Section>

      <Section title="Calendar Structure" icon={<Clock size={18} />}>
        <p>
          <strong>Start Date:</strong> {programme.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {programme.endDate}
        </p>
        <p>
          <strong>Days:</strong> Monday – Friday
        </p>
        <p>
          <strong>Lesson Duration:</strong> 60 mins
        </p>
      </Section>

      <ConflictPanel />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TIMETABLE TAB                                 */
/* -------------------------------------------------------------------------- */

function TimetableTab() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["8:00", "9:00", "10:00", "11:00"];

  return (
    <div className="overflow-x-auto">
      <h3 className="font-semibold mb-4">Master Timetable View</h3>

      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            {days.map((d) => (
              <th key={d} className="border p-2">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="border p-2 font-medium">{time}</td>
              {days.map((day) => (
                <td key={day} className="border p-2 text-center bg-green-50">
                  Available
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TEACHERS TAB                                  */
/* -------------------------------------------------------------------------- */

function TeachersTab() {
  return (
    <div>
      <h3 className="font-semibold mb-4">Assigned Teachers</h3>

      <div className="space-y-4">
        {["John Mwangi", "Mary Wanjiku", "James Otieno"].map((teacher) => (
          <div
            key={teacher}
            className="border rounded-xl p-4 flex justify-between"
          >
            <span>{teacher}</span>
            <span className="text-sm text-gray-500">18 hrs assigned</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              FINANCE TAB                                   */
/* -------------------------------------------------------------------------- */

function FinanceTab({ programme }: any) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <FinanceCard
        title="Total Revenue"
        value={`KES ${programme.projectedRevenue.toLocaleString()}`}
      />

      <FinanceCard
        title="Teacher Earnings"
        value={`KES ${programme.teacherRevenue.toLocaleString()}`}
      />

      <FinanceCard
        title="Platform Earnings"
        value={`KES ${programme.platformRevenue.toLocaleString()}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              APPROVAL TAB                                  */
/* -------------------------------------------------------------------------- */

function ApprovalTab({ status }: { status: string }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Programme governance workflow</p>

      {status === "Pending Approval" && (
        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
            Approve
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg">
            Reject
          </button>
        </div>
      )}

      {status === "Draft" && (
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
          Submit for Approval
        </button>
      )}

      {status === "Published" && (
        <div className="text-green-600 font-semibold">Programme is Live</div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              REUSABLE COMPONENTS                           */
/* -------------------------------------------------------------------------- */

function Section({ title, icon, children }: any) {
  return (
    <div className="border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4 font-semibold">
        {icon}
        {title}
      </div>
      <div className="text-sm text-gray-700 space-y-1">{children}</div>
    </div>
  );
}

function StatCard({ icon, title, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between text-gray-500">
        <span>{title}</span>
        {icon}
      </div>
      <div className="text-xl font-bold mt-4">{value}</div>
    </div>
  );
}

function FinanceCard({ title, value }: any) {
  return (
    <div className="bg-green-50 p-6 rounded-xl border">
      <h4 className="text-sm text-gray-600">{title}</h4>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Draft: "bg-gray-200 text-gray-600",
    "Pending Approval": "bg-yellow-100 text-yellow-700",
    Published: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-4 py-2 text-sm font-semibold rounded-full ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ConflictPanel() {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
      <h4 className="font-semibold text-red-600 mb-2">Conflict Intelligence</h4>
      <ul className="text-sm text-red-500 space-y-1">
        <li>• Grade 3 Mathematics double booked Tuesday 10am</li>
        <li>• Teacher John exceeds max hours (63 hrs limit)</li>
      </ul>
    </div>
  );
}
