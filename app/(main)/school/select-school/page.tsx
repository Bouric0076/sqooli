"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SelectSchoolPage() {
  const { user, setActiveSchool } = useAuthStore();
  const router = useRouter();

  const schools = user?.schools ?? [];

  if (!schools.length) {
    router.replace("/onboarding");
    return null;
  }

  const selectSchool = (school: any) => {
    setActiveSchool(school);
    router.push("/school");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <h1 className="text-lg font-semibold mb-4">Select a School</h1>

        <ul className="space-y-3">
          {schools.map((school: any) => (
            <li
              key={school.id}
              onClick={() => selectSchool(school)}
              className="border rounded-md p-3 cursor-pointer hover:bg-gray-50"
            >
              <p className="font-medium">{school.name}</p>
              <p className="text-xs text-gray-500">Code: {school.code}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
