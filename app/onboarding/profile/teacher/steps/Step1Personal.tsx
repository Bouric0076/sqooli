"use client";

import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormReturn,
} from "react-hook-form";
import { ArrowLeft, ArrowRight, UploadCloud } from "lucide-react";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { FormField } from "@/app/components/ui/form/FormField";
import { PhoneNumberInput } from "@/app/components/ui/form/PhoneNumberInput";
import { RadioGroupInput } from "@/app/components/ui/form/RadioGroupInput";
import { useAuthStore } from "@/app/store/useAuthStore";
import { TeacherProfileForm } from "../page";
import { useEffect, useState } from "react";

type Props = {
  form: UseFormReturn<TeacherProfileForm>;
  register: UseFormRegister<TeacherProfileForm>;
  control: Control<TeacherProfileForm>;
  watch: UseFormWatch<TeacherProfileForm>;
  errors: FieldErrors<TeacherProfileForm>;
  preview: string | null;
  uploadError: string | null;
  handleFile: (file: File) => void;
  onBack: () => void;
  onNext: () => void;
  nationality: string;
};

export default function Step1Personal({
  form,
  preview,
  uploadError,
  handleFile,
  onBack,
  onNext,
  nationality,
}: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Prefill form with user data
  useEffect(() => {
    if (!user) return;

    setValue("fullName", user.fullName ?? "");
    setValue("nationalId", user.nationalId ?? "");
    setValue("nationality", user.nationality ?? "");
    setValue("email", user.email ?? "");
    setValue("phone", user.phone ?? "");
    setValue("address", user?.roleObject?.address ?? "");
    setValue("dob", user?.roleObject?.dob ?? "");
    setValue("Role", user.userType ?? "Teacher");
    setValue("Gender", user?.roleObject?.gender);
    setValue("bio", user?.roleObject?.bio);
    setValue("subjectIds", user?.roleObject?.subjectIds);

    setValue(
      "certificateLevelID",
      user?.roleObject?.certificateLevelId?.toString()
    );
    setValue("LicenseNumber", user?.roleObject?.tscNumber);
    setValue("licenses", user?.roleObject?.licenses);
  }, [user, setValue]);

  const imageToShow = preview || user?.profilePhoto;

  // =========================
  // Submit Handler
  // =========================
  const handleNextSubmit = handleSubmit(async (values) => {
    // if (!user?.access_token) {
    //   alert("User token missing");
    //   return;
    // }

    setLoading(true);
    try {
      const payload = {
        firstName: values.fullName.split(" ")[0],
        lastName: values.fullName.split(" ").slice(1).join(" "),
        nationality: values.nationality,
        nationalId: values.nationalId,
        email: values.email,
        phone: values.phone,
        address: values.address,
        Gender: values.Gender,
        dob: values.dob,
        Role: "Teacher",
      };

      const res = await fetch("/api/teacher/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }

      const data = await res.json();

      // Update auth store
      setUser({
        ...user,
        ...data.User,
      });

      onNext(); // proceed to next step
    } catch (err: any) {
      console.error("Update profile failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <form className="w-full max-w-3xl space-y-6" onSubmit={handleNextSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800">
        Personal Information
      </h2>

      {/* Profile Upload */}
      <div className="space-y-3">
        <label className="text-sm text-gray-700 font-medium">
          Profile Picture
        </label>

        <div className="flex items-center gap-6">
          <div className="h-28 w-48 border border-dashed border-gray-300 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
            {imageToShow ? (
              <img
                src={imageToShow}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <UploadCloud className="text-gray-400" size={26} />
            )}
          </div>
          <div>
            <label className="cursor-pointer flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full text-sm hover:bg-indigo-700">
              <UploadCloud size={16} />
              Click to Upload or Drag & Drop
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                hidden
                onChange={(e) =>
                  e.target.files?.[0] && handleFile(e.target.files[0])
                }
              />
            </label>
            <p className="text-xs text-gray-400 mt-5">
              SVG, PNG,JPG or GIF (max 800x400px)
            </p>
          </div>
        </div>

        {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
        <p className="text-xs text-red-500">
          Please ensure your face is clearly visible on your profile picture
        </p>
      </div>

      {/* Full Name */}
      <FormField
        label="Full Name (as in National ID)"
        error={errors.fullName?.message}
      >
        <TextInput
          placeholder="Enter full name"
          {...register("fullName", { required: "Full name is required" })}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-6">
        {/* Nationality */}
        <RadioGroupInput
          control={control}
          name="nationality"
          label="Nationality"
          error={errors.nationality?.message}
          required="Please select nationality"
          options={[
            { label: "Kenyan Citizen", value: "Kenyan" },
            { label: "Other", value: "Other" },
          ]}
        />

        {watch("nationality") === "Kenyan" && (
          <FormField
            label="National ID Number"
            error={errors.nationalId?.message}
          >
            <TextInput
              placeholder="Enter National ID Number"
              {...register("nationalId", {
                required: "National ID is required",
              })}
            />
          </FormField>
        )}

        {/* Role selection */}
        <RadioGroupInput
          control={control}
          name="Gender"
          label="Select Gender"
          error={errors.Gender?.message}
          required="Please select a gender"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />

        <FormField label="Date of Birth(DOB)" error={errors.dob?.message}>
          <TextInput
            type="date"
            placeholder="Enter Date of Birth(DOB)"
            {...register("dob", { required: "Date of Birth(DOB) is required" })}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormField label="Email Address" error={errors.email?.message}>
          <TextInput
            type="email"
            placeholder="Enter email address"
            {...register("email", { required: "Email is required" })}
          />
        </FormField>

        <PhoneNumberInput
          control={control}
          name="phone"
          label="Phone Number"
          error={errors.phone?.message}
          required="Phone number is required"
        />
      </div>

      <FormField label="Physical Address" error={errors.address?.message}>
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <TextArea
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter physical address"
            />
          )}
        />
      </FormField>

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
          disabled={loading}
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700"
        >
          {loading ? "Saving..." : "Save & Continue"} <ArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
