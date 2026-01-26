"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Users, Loader2 } from "lucide-react";

import MyModal from "@/app/components/general/modals/MyModal";
import { FormField } from "@/app/components/ui/form/FormField";
import { PhoneField } from "@/app/components/ui/form/PhoneInput";
import { PrimaryButton } from "@/app/components/ui/form/PrimaryButton";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { TextInput } from "@/app/components/ui/form/TextInput";

import {
  getEducationLevels,
  getGradeLevels,
  getCertificateLevels,
} from "@/app/helpers/lookups";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";

/* ---------------- TYPES ---------------- */

type RecruitTeacherForm = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  educationLevelId: number | null;
  gradeLevelId: number | null;
  nationalId: string;
  dob: string;
  bio: string;
  gender: string;
  address: string;
  tscNumber: string;
  certificateLevelId: number | null;
  workplace: string;
};

/* ---------------- COMPONENT ---------------- */

export default function RecruitTeacherModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [certificateLevels, setCertificateLevels] = useState<any[]>([]);

  const activeCurriculum = useCurriculumStore(
    (state) => state.activeCurriculum
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RecruitTeacherForm>({
    defaultValues: {
      educationLevelId: null,
      gradeLevelId: null,
      certificateLevelId: null,
    },
  });

  const selectedEducationLevelId = watch("educationLevelId");

  /* ---------------- LOAD EDUCATION LEVELS ---------------- */

  useEffect(() => {
    if (!open || !activeCurriculum?.id) return;

    setEducationLevels([]);
    setGradeLevels([]);
    setCertificateLevels([]);

    getEducationLevels({ curriculumId: activeCurriculum.id })
      .then(setEducationLevels)
      .catch(() => setError("Failed to load education levels"));

    getCertificateLevels({ curriculumId: activeCurriculum.id })
      .then(setCertificateLevels)
      .catch(() => setError("Failed to load certificate levels"));
  }, [open, activeCurriculum]);

  /* ---------------- LOAD GRADE LEVELS (CASCADE) ---------------- */

  useEffect(() => {
    if (!selectedEducationLevelId || !activeCurriculum?.id) {
      setGradeLevels([]);
      setValue("gradeLevelId", null);
      return;
    }

    getGradeLevels({
      curriculumId: activeCurriculum?.id ?? null,
      educationLevelId: selectedEducationLevelId,
    })
      .then(setGradeLevels)
      .catch(() => setError("Failed to load grade levels"));
  }, [selectedEducationLevelId, activeCurriculum, setValue]);

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: RecruitTeacherForm) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // console.log("Submitting recruit teacher:", data);
    try {
      const res = await fetch("/api/school/teachers/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          curriculumId: activeCurriculum?.id ?? null,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      setSuccess("Invite sent successfully");
      reset();

      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        Recruit New Teacher
      </button>

      <MyModal
        title="Recruit Teacher"
        description="Send an invite to a teacher"
        open={open}
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Name */}
          <FormField label="Name" error={errors.fullName?.message}>
            <TextInput
              placeholder="Enter full name"
              {...register("fullName", { required: "Name is required" })}
            />
          </FormField>

          {/* Email */}
          <FormField label="Email Address" error={errors.email?.message}>
            <TextInput
              type="email"
              placeholder="Enter email address"
              {...register("email", { required: "Email is required" })}
            />
          </FormField>

          {/* Phone */}
          <FormField label="Phone Number" error={errors.phone?.message}>
            <PhoneField
              control={control}
              name="phone"
              error={errors.phone?.message}
            />
          </FormField>

          {/* National ID */}
          <FormField label="National ID" error={errors.nationalId?.message}>
            <TextInput
              placeholder="Enter National ID"
              type="number"
              {...register("nationalId", {
                required: "National ID is required",
              })}
            />
          </FormField>

          {/* DOB */}
          <FormField label="Date of Birth" error={errors.dob?.message}>
            <TextInput
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
            />
          </FormField>

          {/* Gender */}
          <FormField label="Gender" error={errors.gender?.message}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                  onChange={field.onChange}
                  placeholder="Select gender"
                />
              )}
            />
          </FormField>

          {/* Address (span 2 columns) */}
          <div className="col-span-2">
            <FormField label="Address" error={errors.address?.message}>
              <TextInput
                placeholder="Enter address"
                {...register("address", { required: "Address is required" })}
              />
            </FormField>
          </div>

          {/* Bio (span 2 columns) */}
          <div className="col-span-2">
            <FormField label="Bio" error={errors.bio?.message}>
              <TextInput
                placeholder="Enter short bio"
                {...register("bio", { required: "Bio is required" })}
              />
            </FormField>
          </div>

          {/* TSC Number */}
          <FormField label="TSC Number" error={errors.tscNumber?.message}>
            <TextInput
              placeholder="Enter TSC Number"
              {...register("tscNumber", { required: "TSC Number is required" })}
            />
          </FormField>

          {/* Role */}
          <FormField label="Role" error={errors.role?.message}>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value}
                  options={[{ label: "Teacher", value: "Teacher" }]}
                  onChange={field.onChange}
                  placeholder="Select role"
                />
              )}
            />
          </FormField>

          {/* Education Level */}
          <FormField
            label="Education Level"
            error={errors.educationLevelId?.message}
          >
            <Controller
              name="educationLevelId"
              control={control}
              rules={{ required: "Education level is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={educationLevels.map((e) => ({
                    label: e.name,
                    value: e.id.toString(),
                  }))}
                  onChange={(val) => field.onChange(Number(val))}
                  placeholder="Select education level"
                />
              )}
            />
          </FormField>

          {/* Grade Level */}
          <FormField label="Grade Level" error={errors.gradeLevelId?.message}>
            <Controller
              name="gradeLevelId"
              control={control}
              rules={{ required: "Grade level is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={gradeLevels.map((g) => ({
                    label: g.name,
                    value: g.id.toString(),
                  }))}
                  onChange={(val) => field.onChange(Number(val))}
                  disabled={!selectedEducationLevelId}
                  placeholder={
                    selectedEducationLevelId
                      ? "Select grade level"
                      : "Select education level first"
                  }
                />
              )}
            />
          </FormField>

          {/* Certificate Level */}
          <FormField
            label="Certificate Level"
            error={errors.certificateLevelId?.message}
          >
            <Controller
              name="certificateLevelId"
              control={control}
              rules={{ required: "Certificate level is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={certificateLevels.map((c) => ({
                    label: c.name,
                    value: c.id.toString(),
                  }))}
                  onChange={(val) => field.onChange(Number(val))}
                  placeholder="Select certificate level"
                />
              )}
            />
          </FormField>

          {/* TSC Number */}
          <FormField label="Workplace" error={errors.workplace?.message}>
            <TextInput
              placeholder="Workplace"
              {...register("workplace", { required: "Workplace is required" })}
            />
          </FormField>
          {/* Messages span 2 columns */}
          <div className="col-span-2">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                {success}
              </div>
            )}
          </div>

          {/* Submit Button span 2 columns */}
          <div className="col-span-2 flex justify-end pt-2">
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Invite"
              )}
            </PrimaryButton>
          </div>
        </form>
      </MyModal>
    </>
  );
}
