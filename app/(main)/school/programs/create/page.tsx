"use client";

import { useState } from "react";
import AuthoritySection from "../components/AuthoritySection";
import CalendarSection from "../components/CalendarSection";
import CapacityProjection from "../components/CapacityProjection";
import ConflictPanel from "../components/ConflictPanel";
import RevenueProjection from "../components/RevenueProjection";
import StepIndicator from "../components/StepIndicator";
import TeacherInvitationManager from "../components/TeacherInvitationManager";
import TimetableGrid from "../components/TimetableGrid";
import AcademicStructureSection from "../components/AcademicStructureSection";
import ProgrammeTypeSection from "../components/ProgrammeTypeSection";
import MonetizationSection from "../components/MonetizationSection";

export type ProgrammeBreak = {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
};

const steps = [
  "Authority",
  "Programme Type",
  "Academic Structure",
  "Calendar Structure",
  "Monetization",
  "Timetable Engine",
  "Teacher Invitations",
];

export default function CreateProgrammePage() {
  const [step, setStep] = useState(0);

  /* ---------------- Shared Programme State ---------------- */

  const [lessonDuration, setLessonDuration] = useState<number>(60);
  const [breaks, setBreaks] = useState<ProgrammeBreak[]>([]);

  /* --------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Create Programme</h1>

      <StepIndicator steps={steps} currentStep={step} />

      <div className="bg-white rounded-2xl p-8 shadow mt-6">
        {step === 0 && <AuthoritySection />}

        {step === 1 && <ProgrammeTypeSection />}

        {step === 2 && <AcademicStructureSection />}

        {step === 3 && (
          <CalendarSection
            lessonDuration={lessonDuration}
            setLessonDuration={setLessonDuration}
            breaks={breaks}
            setBreaks={setBreaks}
          />
        )}

        {step === 4 && <MonetizationSection />}

        {step === 5 && (
          <>
            <TimetableGrid lessonDuration={lessonDuration} breaks={breaks} />
            <ConflictPanel />
            <CapacityProjection />
            <RevenueProjection />
          </>
        )}

        {step === 6 && <TeacherInvitationManager />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-2 bg-gray-200 rounded-lg"
          >
            Back
          </button>
        )}

        {step < steps.length - 1 && (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
