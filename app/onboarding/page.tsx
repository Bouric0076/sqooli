"use client";
import { useRouter } from "next/navigation";
import { GraduationCap, User, Users, School } from "lucide-react"; // Optional icons for better UI
import { useAuthStore } from "@/app/store/useAuthStore";
import { useOnboardingStore } from "@/app/store/useOnboardingStore";
export default function OnboardingStep1() {
  const router = useRouter();

  const { user, isAuthenticated } = useAuthStore();
  const { setBasicInfo } = useOnboardingStore();

  const roles = [
    {
      id: "Student",
      title: "Student",
      description: "I want to learn and grow on the platform",
      path: "/onboarding/interests",
    },
    {
      id: "Parent",
      title: "Parent",
      description: "I want to track and support my child's progress",
      path: "/onboarding/interests",
    },
    {
      id: "Teacher",
      title: "Tutor",
      description: "I want to teach and share my knowledge",
      path: "/onboarding/interests",
    },
    {
      id: "SchoolAdmin",
      title: "School Admin",
      description: "I want to manage my institution and staff",
      path: "/onboarding/school", // Dedicated route for School registration
    },
  ];

  const handleSelect = (roleId: string, path: string) => {
    // You could set the role in your Global State (Zustand/Redux) here
    setBasicInfo({ role: roleId });

    router.push(path);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
        Welcome to Sqooli! {user?.firstName || ""}
      </h2>
      <p className="text-gray-500 mt-2 mb-8 text-lg">
        Tell us who you are so we can personalize your experience.
      </p>

      <div className="grid gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleSelect(role.id, role.path)}
            className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50/50 transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              {/* Optional: Add a placeholder for icons to match professional Figma designs */}
              <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 text-gray-500 group-hover:text-indigo-600 transition-colors">
                {role.id === "school" ? (
                  <School size={24} />
                ) : (
                  <User size={24} />
                )}
              </div>

              <div>
                <span className="block text-lg font-bold text-gray-800">
                  {role.title}
                </span>
                <span className="text-sm text-gray-500 leading-relaxed">
                  {role.description}
                </span>
              </div>
            </div>

            <div className="h-6 w-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600 flex items-center justify-center transition-colors">
              <div className="h-3 w-3 rounded-full bg-indigo-600 scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
