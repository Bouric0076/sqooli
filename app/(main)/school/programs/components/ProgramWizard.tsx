import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { BasicInformation } from "./BasicInformation";
import { BusinessHours } from "./BusinessHours";
import { Sidebar } from "./Sidebar";
import { WizardFooter } from "./WizardFooter";
import { convertTimeTo24, DAYS } from "./constants";
import { ProgramRequest } from "../types/program";

import { useRouter } from "next/navigation";
import { addCProgram } from "@/app/helpers/program";
import { ProgramPreview } from "./Programpreview";

export type WizardFormValues = {
  subProgram: string;
  lessonDuration: number;
  educationLevelId: number;
  gradeLevelId: number;
  subjects: number[];
  startDate: string;
  endDate: string;

  programTypeId?: number;
  curriculumId?: number;

  days?: Record<string, any>;
  holidays?: any[];
};

interface ProgramWizardProps {
  form: UseFormReturn<any>;
  setModalOpen?: (open: boolean) => void;
}

export default function ProgramWizard({ form, setModalOpen }: ProgramWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [done, setDone] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [error, setError] = useState("");

  const router = useRouter();

  /* ---------------- PAYLOAD MAPPER ---------------- */

  const buildPayload = (data: ProgramRequest) => ({
    programId: data.programId || null,
    IntakeId: data.IntakeId || 0,
    programName: data.programName || "",
    programTypeId: data.programTypeId || 0,
    curriculumId: data.curriculumId || 0,
    programStartDate: data.programStartDate || "",
    programEndDate: data.programEndDate || "",

    hasSubPrograms: !!data.subPrograms,
    SlotDurationMinutes:data.lessonDuration ,
    subPrograms: data.subPrograms
      ? [
          {
            name: data.subProgram,
            educationLevelId: data.educationLevelId,
            gradeLevelId: data.gradeLevelId,
            gradeLevelIds:data.grades,
            subjectIds: data.subjects || [],
            startDate: data.startDate,
            endDate: data.endDate,
            SlotDurationMinutes:data.lessonDuration ,
          },
        ]
      : [],

    schedules: DAYS.map((day) => ({
      dayOfWeek: day,
      isActive: data.days?.[day]?.on ?? false,
      startTime: convertTimeTo24(data.days?.[day]?.from),
      endTime: convertTimeTo24(data.days?.[day]?.to),
      breaks: (data.days?.[day]?.breaks || []).map((b: any) => ({
        name: b.name,
        startTime: convertTimeTo24(b.from),
        endTime: convertTimeTo24(b.to),
      })),
    })).filter((d) => d.isActive),

    holidays: (data.holidays || []).map((h: any) => ({
      holidayName: h.name,
      startDate: h.startDate,
      endDate: h.endDate,
    })),

    businessHours: DAYS.filter((day) => data.days?.[day]?.on).map((day) => ({
      day,
      isActive: true,
    })),
  });

  /* ---------------- FORM SUBMIT ---------------- */

const handleFormSubmit = async (formData: WizardFormValues) => {
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    const payload = buildPayload(formData);

    console.log("Final Payload:", JSON.stringify(payload, null, 2));

    await addCProgram(payload);

    if (setModalOpen) setModalOpen(false);


    setSuccess("Program created successfully.");

    // optional short delay so user sees the message
    setTimeout(() => {
      if (payload.programId) {
        router.push(`/school/programs/${payload.programId}/sub-programs`);
      }else{
          router.push("/school/programs");
      }
    }, 1200);

  } catch (err: any) {
    console.error("Program creation failed:", err);

    setError(
      err?.response?.data?.message ||
      err?.message ||
      "Failed to create program. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  /* ---------------- NAVIGATION ---------------- */

  const goNext = () => {
    setDone((d) => [...new Set([...d, step])]);

    if (step === 3) {
      form.handleSubmit(handleFormSubmit)();
      // router.push("/school/programs");
      return;
    }

    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {

    // console.log("Going back from step", step);
    setStep((s) => Math.max(s - 1, 1));
        // console.log("last back from step", step);
    if (step == 1) {
 router.push("/school/programs");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Sidebar step={step} done={done} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "38px 44px 28px",
            }}
          >

            {error && (
  <div className="alert alert-danger mb-3">
    {error}
  </div>
)}

{success && (
  <div className="alert alert-success mb-3">
    {success}
  </div>
)}
            {step === 1 && <BasicInformation form={form} />}
            {step === 2 && <BusinessHours form={form} />}
              {step === 3 && (
                <ProgramPreview
                  form={form}
                  onEditStep={(step: number) => setStep(step)}
                />
              )}
          </div>

          <WizardFooter onBack={goBack} onNext={goNext} />
        </div>
      </div>
    </div>
  );
}