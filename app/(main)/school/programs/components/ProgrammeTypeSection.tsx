"use client";

import { useState } from "react";
import {
  Globe,
  Lock,
  School,
  Laptop,
  BookOpen,
  GraduationCap,
} from "lucide-react";

type ProgrammeType =
  | "Public Programme"
  | "Private Programme"
  | "School Programme"
  | "Digital School Programme"
  | "Tuition Programme"
  | "Curriculum Programme";

export default function ProgrammeTypeSection() {
  const [selectedType, setSelectedType] = useState<ProgrammeType | null>(null);

  const programmeTypes: {
    label: ProgrammeType;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      label: "Public Programme",
      icon: <Globe size={20} />,
      description: "Open to all students across the platform.",
    },
    {
      label: "Private Programme",
      icon: <Lock size={20} />,
      description: "Invite-only programme with restricted access.",
    },
    {
      label: "School Programme",
      icon: <School size={20} />,
      description: "Applies to a specific physical or partner school.",
    },
    {
      label: "Digital School Programme",
      icon: <Laptop size={20} />,
      description: "For digital academies hosted on Sqooli.",
    },
    {
      label: "Tuition Programme",
      icon: <GraduationCap size={20} />,
      description: "Flexible subject-based teaching outside school structure.",
    },
    {
      label: "Curriculum Programme",
      icon: <BookOpen size={20} />,
      description: "Structured programme aligned to formal curriculum.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Programme Type Classification</h2>
        <p className="text-sm text-gray-500 mt-1">
          Select the type of programme you are creating.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {programmeTypes.map((type) => (
          <div
            key={type.label}
            onClick={() => setSelectedType(type.label)}
            className={`cursor-pointer border rounded-2xl p-6 transition hover:shadow
              ${
                selectedType === type.label
                  ? "border-blue-500 bg-indigo-50"
                  : "border-gray-200"
              }
            `}
          >
            <div className="flex items-center gap-3 text-blue-500">
              {type.icon}
              <h3 className="font-semibold text-sm">{type.label}</h3>
            </div>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {type.description}
            </p>
          </div>
        ))}
      </div>

      {/* Governance Preview */}
      {selectedType && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h4 className="font-semibold text-blue-500 mb-2">
            Governance Requirements
          </h4>

          <ul className="text-sm text-blue-500 space-y-1">
            {selectedType === "School Programme" && (
              <>
                <li>• Requires Sqooli Admin approval</li>
                <li>• Break times mandatory</li>
                <li>• Syncs to school master timetable</li>
              </>
            )}

            {selectedType === "Digital School Programme" && (
              <>
                <li>• Requires Sqooli Admin approval</li>
                <li>• Managed by Lead Digital Teacher</li>
                <li>• Supports grade/subject clusters</li>
              </>
            )}

            {selectedType === "Public Programme" && (
              <>
                <li>• Visible to all students</li>
                <li>• Open enrollment enabled</li>
                <li>• Monetization flexible</li>
              </>
            )}

            {selectedType === "Private Programme" && (
              <>
                <li>• Invite-only access</li>
                <li>• Restricted student pool</li>
                <li>• Custom pricing allowed</li>
              </>
            )}

            {selectedType === "Tuition Programme" && (
              <>
                <li>• Flexible slot-based structure</li>
                <li>• Teacher-managed pricing possible</li>
                <li>• Independent timetable logic</li>
              </>
            )}

            {selectedType === "Curriculum Programme" && (
              <>
                <li>• Must align to selected curriculum</li>
                <li>• Grade-level constraint enforced</li>
                <li>• Academic structure validation required</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
