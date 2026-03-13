"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Calendar,
  FolderOpen,
  CheckSquare,
  Grid,
  Users,
  User,
  CreditCard,
  BarChart3,
  MessageSquare,
  Bell,
  ShoppingCart,
  Settings,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import QrcodeComponent from "../invite/QrcodeComponent";

export default function StudentSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { user, activeSchool } = useAuthStore();

  const isActive = (link: string) => {
    if (link === "/school") {
      return pathname === "/school";
    }

    return pathname === link || pathname.startsWith(link + "/");
  };

  const { clearActiveCurriculum } = useCurriculumStore();
  // school menu items (UNCHANGED)
  const menuItems = {
    "CORE ACADEMICS": [
      { icon: Home, label: "Dashboard", link: "/school" },
      {
        icon: BookOpen,
        label: "Curriculum & Subjects",
        link: "/school/curriculum",
      },
      {
        icon: Calendar,
        label: "Lesson Scheduling",
        link: "/school/scheduling",
      },
      {
        icon: FolderOpen,
        label: "Resource Management",
        link: "/school/resources",
      },
      {
        icon: CheckSquare,
        label: "Attendance Management",
        link: "/school/attendance",
      },
      { icon: Grid, label: "Programs", link: "/school/programs" },
      {
        icon: Users,
        label: "Extra Curricula",
        link: "/school/extra-curricula",
      },
    ],
    ADMINISTRATION: [
      { icon: Users, label: "Students", link: "/school/students" },
      { icon: User, label: "Teacher Management", link: "/school/teachers" },
      { icon: CreditCard, label: "Payments", link: "/school/payments" },
    ],
    MANAGEMENT: [
      { icon: User, label: "User Management", link: "/school/users" },
      { icon: Users, label: "Partners", link: "/school/partners" },
      { icon: BarChart3, label: "Reports", link: "/school/reports" },
    ],
  };

  return (
    <div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-20 z-50 text-blue-500 hover:bg-gray-200 bg-gray-100 p-2 rounded-full transition-all duration-300 shadow-sm border border-gray-200 ${
          sidebarOpen ? "left-60" : "left-0"
        }`}
      >
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            !sidebarOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white transition-all duration-300 overflow-hidden flex flex-col border-r border-gray-200 relative z-30`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style={{ stopColor: "#A78BFA" }} />
                  <stop offset="50%" style={{ stopColor: "#F472B6" }} />
                  <stop offset="100%" style={{ stopColor: "#FB923C" }} />
                </linearGradient>
              </defs>
              <circle cx="24" cy="24" r="24" fill="url(#logoGradient)" />
              <circle cx="24" cy="24" r="18" fill="white" />
              <circle cx="24" cy="24" r="14" fill="url(#logoGradient)" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-sm text-gray-900">
              {activeSchool?.name}
            </div>
            <div className="font-semibold text-sm text-gray-900">
              {activeSchool?.code}
            </div>
            <div className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block">
              {activeSchool?.schoolTypeName} School
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {Object.entries(menuItems).map(([section, items]) => (
            <div key={section} className="mb-6">
              <h3 className="px-2 text-[11px] font-semibold text-gray-400 mb-3 tracking-wider">
                {section}
              </h3>

              {items.map((item, idx) => {
                const Icon = item.icon;
                const active = isActive(item.link);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      clearActiveCurriculum();

                      router.push(item.link);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-normal rounded-full
                      transition-all duration-200
                      ${
                        active
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <QrcodeComponent />
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            <span>Powered by</span>
            <span className="inline-flex gap-0.5 ml-1">
              {["S", "q", "o", "o", "ll"].map((l, i) => (
                <span
                  key={i}
                  className="w-[18px] h-[18px] bg-blue-100 text-blue-600 rounded text-[10px] flex items-center justify-center font-bold"
                >
                  {l}
                </span>
              ))}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
