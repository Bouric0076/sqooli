"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Download,
  FileSpreadsheet,
  FileText,
  Search,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const enrollmentData = [
  { month: "Jan", students: 180 },
  { month: "Feb", students: 210 },
  { month: "Mar", students: 235 },
  { month: "Apr", students: 250 },
  { month: "May", students: 290 },
  { month: "Jun", students: 315 },
  { month: "Jul", students: 360 },
];

const attendanceData = [
  { day: "Mon", attendance: 95 },
  { day: "Tue", attendance: 92 },
  { day: "Wed", attendance: 96 },
  { day: "Thu", attendance: 91 },
  { day: "Fri", attendance: 94 },
];

const levelData = [
  { name: "PP1", students: 80 },
  { name: "PP2", students: 95 },
  { name: "Grade 1", students: 120 },
  { name: "Grade 2", students: 110 },
  { name: "Grade 3", students: 135 },
  { name: "Grade 4", students: 128 },
];

const genderData = [
  { name: "Boys", value: 420 },
  { name: "Girls", value: 395 },
];

const COLORS = ["#2563eb", "#10b981"];

const reports = [
  {
    name: "Student Performance Report",
    generated: "Today",
    by: "Administrator",
    format: "PDF",
  },
  {
    name: "Attendance Report",
    generated: "Yesterday",
    by: "Principal",
    format: "Excel",
  },
  {
    name: "Fee Collection Report",
    generated: "2 days ago",
    by: "Finance",
    format: "PDF",
  },
  {
    name: "Teacher Workload Report",
    generated: "3 days ago",
    by: "Administrator",
    format: "Excel",
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="p-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Reports & Analytics
            </h1>

            <p className="text-slate-500 mt-1">
              Analyze school performance and generate reports.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <select className="border rounded-lg px-4 py-2 bg-white">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Term</option>
              <option>This Year</option>
            </select>

            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
              <FileSpreadsheet size={18} />
              Export Excel
            </button>

            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg">
              <FileText size={18} />
              Export PDF
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl border p-4 mb-6">

          <div className="relative max-w-md">

            <Search className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              placeholder="Search reports..."
              className="w-full border rounded-lg pl-10 py-2 pr-4"
            />

          </div>

        </div>

        {/* KPI */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <Card
            icon={<Users />}
            title="Total Students"
            value="815"
            change="+12%"
          />

          <Card
            icon={<GraduationCap />}
            title="Teachers"
            value="52"
            change="+3%"
          />

          <Card
            icon={<BookOpen />}
            title="Attendance"
            value="94%"
            change="+1.2%"
          />

          <Card
            icon={<TrendingUp />}
            title="Pass Rate"
            value="88%"
            change="+5%"
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <ChartCard title="Enrollment Trend">

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  dataKey="students"
                  stroke="#2563eb"
                  fill="url(#color)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </ChartCard>

          <ChartCard title="Students by Gender">

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  label
                >
                  {genderData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Legend />

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </ChartCard>

        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <ChartCard title="Students by Education Level">

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="students"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </ChartCard>

          <ChartCard title="Weekly Attendance">

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis domain={[85, 100]} />

                <Tooltip />

                <Line
                  dataKey="attendance"
                  stroke="#10b981"
                  strokeWidth={3}
                />

              </LineChart>
            </ResponsiveContainer>

          </ChartCard>

        </div>

        {/* Recent Reports */}

        <div className="bg-white rounded-xl border overflow-hidden">

          <div className="p-5 border-b font-semibold">
            Recent Generated Reports
          </div>

          <div className="overflow-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left p-4">Report</th>

                  <th className="text-left p-4">Generated</th>

                  <th className="text-left p-4">Generated By</th>

                  <th className="text-left p-4">Format</th>

                  <th className="text-right p-4">Action</th>

                </tr>

              </thead>

              <tbody>

                {reports.map((report) => (

                  <tr
                    key={report.name}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4 font-medium">{report.name}</td>

                    <td className="p-4">{report.generated}</td>

                    <td className="p-4">{report.by}</td>

                    <td className="p-4">{report.format}</td>

                    <td className="p-4 text-right">

                      <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
                        <Download size={18} />
                        Download
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({
  icon,
  title,
  value,
  change,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex justify-between items-center mb-5">
        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>

        <span className="text-green-600 font-medium text-sm">
          {change}
        </span>
      </div>

      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="font-semibold text-lg mb-6">{title}</h2>
      {children}
    </div>
  );
}