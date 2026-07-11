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
  School,
  Users2,
  Layers,
  LineChart,
  UserSquare,
} from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import QrcodeComponent from "../invite/QrcodeComponent";

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

const [openMenus, setOpenMenus] = useState({
  userManagement:
    pathname.startsWith("/admin/users") ||
    pathname.startsWith("/admin/roles"),

  curriculumSetup:
    pathname.startsWith("/admin/curriculums") ||
    pathname.startsWith("/admin/education-levels") ||
    pathname.startsWith("/admin/grade-levels") ||
    pathname.startsWith("/admin/subject-categories") ||
    pathname.startsWith("/admin/subjects") ||
    pathname.startsWith("/admin/topics"),
});

const toggleMenu = (menu: keyof typeof openMenus) => {
  setOpenMenus((prev) => ({
    ...prev,
    [menu]: !prev[menu],
  }));
};

  const isActive = (link: string) => {
    if (link === "/admin") {
      return pathname === "/admin";
    }

    return pathname === link || pathname.startsWith(link + "/");
  };

  const { clearActiveCurriculum } = useCurriculumStore();
  // admin menu items (UNCHANGED)
  const menuItems = {
    "Main Menu": [
      { icon: Home, label: "Dashboard", link: "/admin" },
      { icon: School, label: "Schools", link: "/admin/schools" },
      { icon: Users2, label: "Students", link: "/admin/students" },
      { icon: UserSquare, label: "Tutors", link: "/admin/tutors" },
      { icon: Grid, label: "Programs", link: "/admin/programs" },
      { icon: Users, label: "Partners", link: "/admin/partners" },
      { icon: CreditCard, label: "Payments", link: "/admin/payments" },
      { icon: Layers, label: "Activity Feed", link: "/admin/activity-feed" },
      { icon: LineChart, label: "Reports", link: "/admin/reports" },

    ],
   CONFIGURATIONS: [
  {
    id: "curriculumSetup",
    icon: BookOpen,
    label: "Curriculum Setup",
    children: [
      {
        icon: BookOpen,
        label: "Curriculums",
        link: "/admin/curriculums",
      },
      {
        icon: Calendar,
        label: "Education Levels",
        link: "/admin/education-levels",
      },
      {
        icon: FolderOpen,
        label: "Grade Levels",
        link: "/admin/grade-levels",
      },
      {
        icon: CheckSquare,
        label: "Subject Categories",
        link: "/admin/subject-categories",
      },
      {
        icon: Grid,
        label: "Subjects",
        link: "/admin/subjects",
      },
      {
        icon: Users,
        label: "Topics",
        link: "/admin/topics",
      },
    ],
  },

  {
    id: "userManagement",
    icon: Users,
    label: "User Management",
    children: [
      {
        icon: User,
        label: "Users",
        link: "/admin/users",
      },
      {
        icon: Users,
        label: "Roles",
        link: "/admin/roles",
      },
    ],
  },
],
    // MANAGEMENT: [
    //   { icon: User, label: "User Management", link: "/admin/users" },
    //   // { icon: Users, label: "Partners", link: "/admin/partners" },
    //   { icon: BarChart3, label: "Reports", link: "/admin/reports" },
    // ],
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
        className={` h-full  ${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#255480] transition-all duration-300 overflow-hidden flex flex-col border-r border-gray-200 relative z-30`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
   
        <img src="/logo.svg" alt="Live Logo" className="w-40 " />

      
     
          {/* <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
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
              {user?.firstName}
            </div>
            <div className="font-semibold text-sm text-gray-900">
              {user?.userType}
            </div>
            <div className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block">
              Super Admin
            </div>
          </div> */}
        </div>
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {Object.entries(menuItems).map(([section, items]) => (
            <div key={section} className="mb-6">
              <h3 className="px-2 text-[14px] font-semibold text-gray-100 mb-3 tracking-wider">
                {section}
              </h3>

{items.map((item: any, idx: number) => {
  const Icon = item.icon;

  if (item.children) {
    const active = item.children.some((child: any) => isActive(child.link));
    const expanded = openMenus[item.id as keyof typeof openMenus];

    return (
      <div key={idx}>
        <button
          onClick={() =>
            toggleMenu(item.id as keyof typeof openMenus)
          }
          className={`w-full flex items-center justify-between px-4 py-3 rounded-md transition-all
            ${
              active
                ? "bg-[#1D3C5B] text-white"
                : "text-gray-100 hover:bg-gray-700"
            }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
            <span>{item.label}</span>
          </div>

          {expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {expanded && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child: any, childIdx: number) => {
              const ChildIcon = child.icon;
              const childActive = isActive(child.link);

              return (
                <button
                  key={childIdx}
                  onClick={() => {
                    clearActiveCurriculum();
                    router.push(child.link);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all
                    ${
                      childActive
                        ? "bg-[#1D3C5B] text-white"
                        : "text-gray-50 hover:bg-gray-700"
                    }`}
                >
                  <ChildIcon className="w-4 h-4" strokeWidth={1.5} />
                  <span>{child.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const active = isActive(item.link);

  return (
    <button
      key={idx}
      onClick={() => {
        clearActiveCurriculum();
        router.push(item.link);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] rounded-md transition-all duration-200
        ${
          active
            ? "bg-[#1D3C5B] text-white"
            : "text-gray-50 hover:bg-gray-700 hover:translate-x-1"
        }`}
    >
      <Icon className="w-5 h-5" strokeWidth={1.5} />
      <span>{item.label}</span>
    </button>
  );
})}
            </div>
          ))}
        </nav>


        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-[11px] text-gray-50 flex items-center gap-1">
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
