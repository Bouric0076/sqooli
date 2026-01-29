"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { FormField } from "@/app/components/ui/form/FormField";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { TextInput } from "@/app/components/ui/form/TextInput";

import {
  getEducationLevels,
  getGradeLevels,
  getSubjects,
  getTopics,
} from "@/app/helpers/lookups";

import { useOnboardingStore } from "@/app/store/useOnboardingStore";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function StudentProfile() {
  const { studentEnrollments, setBasicInfo, addStudentEnrollment } =
    useOnboardingStore();

  const user = useAuthStore((state) => state.user);
  const curriculumId = studentEnrollments[0]?.curriculumId ?? null;

  const { register, control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      educationLevelId: null,
      gradeLevelId: null,
      subjectIds: [] as number[],
      topicId: null,
      Email: user?.email || "",
      Phone: "",
      Gender: "",
    },
  });

  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const educationLevelId = watch("educationLevelId");
  const gradeLevelId = watch("gradeLevelId");
  const subjectIds = watch("subjectIds");

  /* ---------------- Load lookups ---------------- */
  useEffect(() => {
    if (!curriculumId) return;
    getEducationLevels({ curriculumId }).then(setEducationLevels);
  }, [curriculumId]);

  useEffect(() => {
    if (!educationLevelId || !curriculumId) {
      setGradeLevels([]);
      setValue("gradeLevelId", null);
      return;
    }
    getGradeLevels({ curriculumId, educationLevelId }).then(setGradeLevels);
  }, [educationLevelId, curriculumId, setValue]);

  useEffect(() => {
    if (!gradeLevelId || !curriculumId) {
      setSubjects([]);
      setValue("subjectIds", []);
      return;
    }
    getSubjects({ curriculumId, gradeLevelId }).then(setSubjects);
  }, [gradeLevelId, curriculumId, setValue]);

  useEffect(() => {
    if (!subjectIds || subjectIds.length === 0 || !curriculumId) {
      setTopics([]);
      setValue("topicId", null);
      return;
    }
    // getTopics({ curriculumId, subjectId: subjectIds[0] }).then(setTopics);
  }, [subjectIds, curriculumId, setValue]);

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: any) => {
    setBasicInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      role: "student",
      email: data.Email,
      phone: data.Phone,
      gender: data.Gender,
    });

    addStudentEnrollment({
      curriculumId: curriculumId!,
      educationLevelId: data.educationLevelId,
      gradeLevelId: data.gradeLevelId,
      schoolId: null,
      subjectIds: data.subjectId ? [data.subjectId] : [],
      topicId: data.topicId ?? null,
    });

    try {
      const payload = {
        ...data,
        role: "student",
        studentEnrollments: [
          {
            curriculumId: curriculumId!,
            educationLevelId: data.educationLevelId,
            gradeLevelId: data.gradeLevelId,
            schoolId: null,
            subjectIds: data.subjectIds ? data.subjectIds : [],
          },
        ],
      };

      // console.log("Submitting payload:", payload);

      // return;

      const res = await fetch("/api/onboarding/finish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to finish onboarding");
      }

      setSuccessMessage("Onboarding completed successfully!");
      setTimeout(() => {
        router.push("/student");
      }, 1500);

      return;
    } catch (error: any) {
      setApiError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Logo */}
      <div className="mb-6">
        <img
          src="/logo.svg" // replace with your logo path
          alt="Logo"
          className="h-16 w-auto mx-auto"
        />
      </div>

      <PageHeader
        title="Student Profile"
        description="Complete your profile information"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 p-8 bg-white rounded-2xl shadow-lg max-w-4xl w-full mt-6"
      >
        {/* Name */}
        <FormField label="First Name">
          <TextInput
            placeholder="First name"
            {...register("firstName", { required: true })}
            className="border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </FormField>
        <FormField label="Last Name">
          <TextInput
            placeholder="Last name"
            {...register("lastName", { required: true })}
            className="border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </FormField>

        {/* Name */}
        <FormField label="Email">
          <TextInput
            readOnly
            placeholder="Email address"
            {...register("Email", { required: true })}
            className="border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </FormField>
        <FormField label="Phone">
          <TextInput
            placeholder="+25434567890"
            {...register("Phone", { required: true })}
            className="border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
        </FormField>

        <div className="col-span-2">
          {/* Gender */}
          <FormField label="Gender">
            <Controller
              name="Gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  onChange={(v) => field.onChange(v)}
                  className="border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
              )}
            />
          </FormField>
        </div>

        {/* Education Level */}
        <FormField label="Education Level">
          <Controller
            name="educationLevelId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={educationLevels.map((e) => ({
                  label: e.name,
                  value: e.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            )}
          />
        </FormField>

        {/* Grade Level */}
        <FormField label="Grade Level">
          <Controller
            name="gradeLevelId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={gradeLevels.map((g) => ({
                  label: g.name,
                  value: g.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                className="border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            )}
          />
        </FormField>

        {/* Subjects */}
        <div className="col-span-2">
          <FormField label="Subjects">
            <Controller
              name="subjectIds"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const selectedSubjects = subjects.filter((s) =>
                  field.value.includes(s.id)
                );
                const availableSubjects = subjects.filter(
                  (s) => !field.value.includes(s.id)
                );

                const addSubject = (id: number) => {
                  field.onChange([...field.value, id]);
                };

                const removeSubject = (id: number) => {
                  field.onChange(field.value.filter((v: number) => v !== id));
                };

                return (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedSubjects.map((s) => (
                        <span
                          key={s.id}
                          className="flex items-center gap-1 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
                        >
                          {s.name}
                          <button
                            type="button"
                            onClick={() => removeSubject(s.id)}
                            className="text-blue-600 hover:text-blue-900 font-bold ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <select
                      className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400"
                      onChange={(e) => addSubject(Number(e.target.value))}
                      value=""
                    >
                      <option value="" disabled>
                        Add subject...
                      </option>
                      {availableSubjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }}
            />
          </FormField>
        </div>

        {/* Submit Buttons */}
        <div className="col-span-2 flex justify-end pt-6">
          <div className="flex gap-4">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-full font-bold shadow hover:shadow-md transition-shadow duration-300"
            >
              <ArrowLeft size={18} /> Back
            </button>

            <button
              disabled={subjectIds.length === 0}
              type="submit"
              className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold shadow-md transition-all duration-300 ${
                subjectIds.length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save & Continue <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
