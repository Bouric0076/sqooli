"use client";

import {
  Users,
  GraduationCap,
  BookOpen,
  Layers,
  Calendar,
  BookAIcon,
  FileQuestionIcon,
  BookOpenText,
  VideoIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const hideMenu = pathname.includes("create-assignment");

  const sidebarItems = [
    {
      icon: BookAIcon,
      label: "Assignments",
      link: "/school/resources/assignments",
    },
    {
      icon: FileQuestionIcon,
      label: "Quizzes",
      link: "/school/resources/quizzes",
    },
    {
      icon: BookOpen,
      label: "Exams",
      link: "/school/resources/exams",
    },
    {
      icon: Layers,
      label: "Notes",
      link: "/school/resources/notes",
    },
    {
      icon: BookOpenText,
      label: "Books",
      link: "/school/resources/books",
    },
    {
      icon: VideoIcon,
      label: "Videos",
      link: "/school/resources/videos",
    },
  ];

  return (
    <div className="h-screen bg-white flex font-sans">
      {/* Sidebar */}
      {!hideMenu && (
        <aside className="w-52 bg-white border-r border-gray-200 p-4 ">
          <nav className="space-y-1 h-screen">
            {sidebarItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.link || pathname.startsWith(item.link + "/");

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => router.push(item.link)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors select-none ${
                    isActive
                      ? "bg-blue-500 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-50 font-normal"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      <div className="flex-1 flex flex-col h-screen">{children}</div>
    </div>
  );
}
