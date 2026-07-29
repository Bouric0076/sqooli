"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  AlertTriangle,
  Pencil,
  User as UserIcon,
  School,
} from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import PageHeader from "@/app/components/ui/navigation/PageHeader";

export default function StudentProfilePage() {
  const user = useAuthStore((state) => state.user) as any;
  const router = useRouter();

  const missingFields = useMemo(() => {
    if (!user) return [];
    const missing: string[] = [];
    if (!user.phone) missing.push("Phone number");
    if (!user.gender) missing.push("Gender");
    if (!user.nationalId) missing.push("National ID");
    if (!user.roleObject?.address) missing.push("Address");
    return missing;
  }, [user]);

  const isComplete = missingFields.length === 0;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="My Profile"
        description="View and manage your personal information"
      />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Incomplete profile banner */}
        {!isComplete && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                Your profile is incomplete
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Missing: {missingFields.join(", ")}
              </p>
            </div>
            <button
              onClick={() => router.push("/student/profile/complete")}
              className="shrink-0 bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-700"
            >
              Complete Profile
            </button>
          </div>
        )}

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-9 h-9 text-blue-500" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
                </h2>
                <p className="text-sm text-gray-500">{user.userRole || "Student"}</p>
                {isComplete && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Profile complete
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => router.push("/student/profile/complete")}
              className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-5 py-2 rounded-full hover:bg-gray-50"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
            <DetailRow icon={<Mail className="w-4 h-4" />} label="Email" value={user.email} />
            <DetailRow icon={<Phone className="w-4 h-4" />} label="Phone" value={user.phone} />
            <DetailRow label="Gender" value={user.gender} />
            <DetailRow label="National ID" value={user.nationalId} />
            <DetailRow
              icon={<MapPin className="w-4 h-4" />}
              label="Address"
              value={user.roleObject?.address}
            />
            <DetailRow label="Date of Birth" value={user.roleObject?.dob} />
          </div>

          {/* Schools */}
          {user.schools?.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Schools</p>
              <div className="flex flex-wrap gap-2">
                {user.schools.map((school: any) => (
                  <span
                    key={school.id}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full"
                  >
                    <School className="w-3.5 h-3.5" />
                    {school.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-center gap-2 text-sm text-gray-900">
        {icon}
        <span>{value || "—"}</span>
      </div>
    </div>
  );
}
