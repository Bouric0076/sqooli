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

// Shape of a leaf (non-expandable) menu item
type LeafItem = {
  icon: React.ElementType;
  label: string;
  link: string;
  permission?: string;
};

// Shape of a parent item that expands into children
type ParentItem = {
  id: string;
  icon: React.ElementType;
  label: string;
  children: LeafItem[];
};

type MenuItem = LeafItem | ParentItem;

const hasChildren = (item: MenuItem): item is ParentItem =>
  Object.prototype.hasOwnProperty.call(item, "children");

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { user, hasPermission, isSuperAdmin } = useAuthStore();

  const [openMenus, setOpenMenus] = useState({
    userManagement:
      pathname.startsWith("/admin/users") || pathname.startsWith("/admin/roles"),

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

  // Each leaf item can optionally declare a required permission.
  // No `permission` key = always visible to any logged-in admin user.
  const menuItems: Record<string, MenuItem[]> = {
    "Main Menu": [
      { icon: Home, label: "Dashboard", link: "/admin" },
      { icon: School, label: "Schools", link: "/admin/schools", permission: "schools.view" },
      { icon: Users2, label: "Students", link: "/admin/students", permission: "students.view" },
      { icon: UserSquare, label: "Tutors", link: "/admin/tutors", permission: "tutors.view" },
      { icon: Grid, label: "Programs", link: "/admin/programs", permission: "programs.view" },
      { icon: Users, label: "Partners", link: "/admin/partners", permission: "partners.view" },
      { icon: CreditCard, label: "Payments", link: "/admin/payments", permission: "payments.view" },
      {
        icon: Layers,
        label: "Activity Feed",
        link: "/admin/activity-feed",
        permission: "activityfeed.view",
      },
      { icon: LineChart, label: "Reports", link: "/admin/reports", permission: "reports.view" },
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
            permission: "curriculums.view",
          },
          {
            icon: Calendar,
            label: "Education Levels",
            link: "/admin/education-levels",
            permission: "educationlevels.view",
          },
          {
            icon: FolderOpen,
            label: "Grade Levels",
            link: "/admin/grade-levels",
            permission: "gradelevels.view",
          },
          {
            icon: CheckSquare,
            label: "Subject Categories",
            link: "/admin/subject-categories",
            permission: "subjectcategories.view",
          },
          {
            icon: Grid,
            label: "Subjects",
            link: "/admin/subjects",
            permission: "subjects.view",
          },
          {
            icon: Users,
            label: "Topics",
            link: "/admin/topics",
            permission: "topics.view",
          },
        ],
      },
      {
        id: "userManagement",
        icon: Users,
        label: "User Management",
        children: [
          { icon: User, label: "Users", link: "/admin/users", permission: "users.view" },
          { icon: Users, label: "Roles", link: "/admin/roles", permission: "roles.view" },
        ],
      },
    ],
  };

  // Returns true if the current user is allowed to see this item
  const isAllowed = (permission?: string) =>
    !permission || isSuperAdmin || hasPermission(permission);

  // Filter each section: for parent items, filter their children first and
  // drop the parent if no children remain visible; for leaf items, filter
  // directly by permission. Sections with no visible items are dropped too.
  const visibleMenuItems = Object.fromEntries(
    Object.entries(menuItems)
      .map(([section, items]) => {
        const filtered = items
          .map((item) => {
            if (hasChildren(item)) {
              const visibleChildren = item.children.filter((child) =>
                isAllowed(child.permission)
              );
              if (visibleChildren.length === 0) return null;
              return { ...item, children: visibleChildren };
            }
            return isAllowed(item.permission) ? item : null;
          })
          .filter((item): item is MenuItem => item !== null);

        return [section, filtered] as const;
      })
      .filter(([, items]) => items.length > 0)
  );

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
        className={`h-full ${
          sidebarOpen ? "w-64" : "w-0"
        } bg-[#255480] transition-all duration-300 overflow-hidden flex flex-col border-r border-gray-200 relative z-30`}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <img src="/logo.svg" alt="Live Logo" className="w-40" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {Object.entries(visibleMenuItems).map(([section, items]) => (
            <div key={section} className="mb-6">
              <h3 className="px-2 text-[14px] font-semibold text-gray-100 mb-3 tracking-wider">
                {section}
              </h3>

              {items.map((item, idx) => {
                const Icon = item.icon;

                if (hasChildren(item)) {
                  const active = item.children.some((child) => isActive(child.link));
                  const expanded = openMenus[item.id as keyof typeof openMenus];

                  return (
                    <div key={idx}>
                      <button
                        onClick={() => toggleMenu(item.id as keyof typeof openMenus)}
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
                          {item.children.map((child, childIdx) => {
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

        {/* <QrcodeComponent /> */}

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