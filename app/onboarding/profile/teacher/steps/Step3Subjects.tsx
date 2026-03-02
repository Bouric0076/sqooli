"use client";

import { TeacherProfileForm } from "../types";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormField } from "@/app/components/ui/form/FormField";
import { useEffect, useState } from "react";
import {
  getCertificateLevels,
  getEducationLevels,
  getGradeLevels,
  getSubjects,
} from "@/app/helpers/lookups";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { useOnboardingStore } from "@/app/store/useOnboardingStore";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { useRouter } from "next/navigation";

type Props = {
  form: UseFormReturn<TeacherProfileForm>;
  register: UseFormRegister<TeacherProfileForm>;
  control: Control<TeacherProfileForm>;
  watch: UseFormWatch<TeacherProfileForm>;
  errors: FieldErrors<TeacherProfileForm>;
  onBack: () => void;
  onNext: () => void;
};

export default function Step3Subjects({
  form,

  onBack,
  onNext,
}: Props) {
  const {
    watch,
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [certificateLevels, setCertificateLevel] = useState<any[]>([]);

  const educationLevelId = watch("educationLevelId");
  const gradeLevelId = watch("gradeLevelId");

  const activeCurriculum = useCurriculumStore(
    (state) => state.activeCurriculum
  );
  const router = useRouter();
  const { teacherEnrollments } = useOnboardingStore();
  const curriculumId = teacherEnrollments[0]?.curriculumId;

  /* ---------------- LOAD CERTIFICATES & EDUCATION ---------------- */
  useEffect(() => {
    if (!curriculumId) {
      router.push("/onboarding/curriculum");
      return;
    }

    Promise.all([
      getCertificateLevels(),
      getEducationLevels({ curriculumId }),
    ]).then(([certLevels, eduLevels]) => {
      setCertificateLevel(certLevels);
      setEducationLevels(eduLevels);
    });
  }, [curriculumId, activeCurriculum, router]);

  /* ---------------- EDUCATION → GRADE ---------------- */
  useEffect(() => {
    if (!educationLevelId || !curriculumId) {
      setGradeLevels([]);
      setValue("gradeLevelId", undefined);
      return;
    }

    getGradeLevels({ curriculumId, educationLevelId }).then((grades) => {
      setGradeLevels(grades);
      setValue("gradeLevelId", undefined);
    });
  }, [educationLevelId, curriculumId, setValue]);

  /* ---------------- GRADE → SUBJECT ---------------- */
  useEffect(() => {
    if (!gradeLevelId || !curriculumId) {
      setSubjects([]);
      setValue("subjectIds", []);
      return;
    }

    getSubjects({ curriculumId, gradeLevelId }).then((subs) => {
      setSubjects(subs);
      setValue("subjectIds", []);
    });
  }, [gradeLevelId, curriculumId, setValue]);

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmitSubjects = async (data: TeacherProfileForm) => {
    try {
      const res = await fetch("/api/teacher/update-subjects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curriculumId,
          educationLevelId: Number(data.educationLevelId),
          gradeLevelId: Number(data.gradeLevelId),
          tscNumber: data.LicenseNumber,
          subjectIds: data.subjectIds,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      console.log("Saved:", result);
      onNext();
    } catch (error: any) {
      console.error("Save failed:", error.message);
    }
  };

  return (
    <form
      className="w-full max-w-3xl space-y-6"
      onSubmit={handleSubmit(handleSubmitSubjects)}
    >
      <h2 className="text-2xl font-semibold text-gray-800">Subjects</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Education Level */}
        <FormField
          label="Education Level"
          error={errors.educationLevelId?.message}
        >
          <Controller
            name="educationLevelId"
            control={control}
            rules={{ required: "Education Level is required" }}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString() || ""}
                options={[
                  { label: "Select Education Level", value: "" },
                  ...educationLevels.map((e) => ({
                    label: e.name,
                    value: e.id.toString(),
                  })),
                ]}
                onChange={(v) => field.onChange(v ? Number(v) : undefined)}
              />
            )}
          />
        </FormField>

        {/* Grade Level */}
        <FormField label="Grade Level" error={errors.gradeLevelId?.message}>
          <Controller
            name="gradeLevelId"
            control={control}
            rules={{ required: "Grade Level is required" }}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString() || ""}
                options={[
                  { label: "Select Grade Level", value: "" },
                  ...gradeLevels.map((g) => ({
                    label: g.name,
                    value: g.id.toString(),
                  })),
                ]}
                onChange={(v) => field.onChange(v ? Number(v) : undefined)}
              />
            )}
          />
        </FormField>
      </div>

      {/* License Number */}
      <FormField
        label="Teaching Certification/TSC License Number"
        error={errors.LicenseNumber?.message}
      >
        <TextInput
          placeholder="Enter Teaching Certification/TSC License Number"
          {...register("LicenseNumber", {
            required: "Teaching Certification/TSC License Number is required",
          })}
        />
      </FormField>

      {/* Subjects */}
      <Controller
        name="subjectIds"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (val: number[]) =>
            val && val.length > 0
              ? true
              : "Please select at least one subject to continue",
        }}
        render={({ field }) => {
          const selectedSubjects = field.value || [];

          const toggleSubject = (id: number) => {
            let updated = [...selectedSubjects];

            if (updated.includes(id)) {
              updated = updated.filter((s) => s !== id);
            } else {
              if (updated.length >= 4) return;
              updated.push(id);
            }

            field.onChange(updated);
          };

          return (
            <div>
              <p className="font-medium text-gray-700 mb-1">Subjects</p>
              <p className="text-sm text-red-500 mb-3">
                You can choose up to 4 subjects
              </p>

              <div className="grid grid-cols-2 gap-3">
                {subjects.map((subject) => {
                  const checked = selectedSubjects.includes(subject.id);

                  return (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => toggleSubject(subject.id)}
                      className={`flex items-center justify-between border rounded-lg px-4 py-2 text-sm
                        ${
                          checked
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {subject.name}
                      <input
                        type="checkbox"
                        checked={checked}
                        readOnly
                        className="accent-indigo-600"
                      />
                    </button>
                  );
                })}
              </div>

              {errors.subjectIds && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.subjectIds.message}
                </p>
              )}
            </div>
          );
        }}
      />

      {/* Buttons */}
      <div className="flex justify-between pt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700"
        >
          Save & Continue <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
