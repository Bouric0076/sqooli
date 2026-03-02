"use client";

import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { Users, GraduationCap, BookOpen, Layers, Calendar } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // console.log(c_type);
  const hideMenu = pathname.includes("create-lesson");

  const { activeCurriculum } = useCurriculumStore();

  //console.log(activeCurriculum);

  const sidebarItems = [
    {
      icon: Users,
      label: "Teachers",
      link: `/school/curriculum/${activeCurriculum?.name}/teachers`,
    },
    {
      icon: GraduationCap,
      label: "Students",
      link: `/school/curriculum/${activeCurriculum?.name}/students`,
    },
    {
      icon: BookOpen,
      label: "Lessons",
      link: `/school/curriculum/${activeCurriculum?.name}/lessons`,
    },
    {
      icon: Layers,
      label: "Extra Curricula",
      link: `/school/curriculum/${activeCurriculum?.name}/extra-curricula`,
    },
    {
      icon: Calendar,
      label: "Schedule",
      link: `/school/curriculum/${activeCurriculum?.name}/schedule`,
    },
  ];

  return (
    <>
      <div className="h-screen bg-white flex font-sans">
        {/* Sidebar */}
        {!hideMenu && activeCurriculum && (
          <aside className="w-52 bg-white border-r border-gray-200 p-4 ">
            <nav className="space-y-1 h-screen">
              {sidebarItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.link ||
                  pathname.startsWith(item.link + "/");

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => activeCurriculum && router.push(item.link)}
                    disabled={!activeCurriculum}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors select-none ${
                      isActive
                        ? "bg-blue-500 text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-50 font-normal"
                    } ${
                      !activeCurriculum ? "opacity-50 cursor-not-allowed" : ""
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
    </>
  );
}
