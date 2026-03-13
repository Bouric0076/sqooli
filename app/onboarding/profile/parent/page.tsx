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

  const { register, control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      Email: user?.email || "",
      Phone: user?.phone || "",
      Gender: user?.gender || "",
    },
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /* ---------------- Load lookups ---------------- */

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: any) => {
    setBasicInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      role: "parent",
      email: data.Email,
      phone: data.Phone,
      gender: data.Gender,
    });

    try {
      const payload = {
        ...data,
        role: "parent",
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
        router.push("/parent");
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
        title="Parent Profile"
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
              disabled={Phone.length === 0}
              type="submit"
              className={`flex items-center gap-2 px-10 py-3 rounded-full font-bold shadow-md transition-all duration-300 ${
                Phone.length > 0
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
