"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { ArrowLeft, UploadCloud } from "lucide-react";

import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { PhoneNumberInput } from "@/app/components/ui/form/PhoneNumberInput";
import { RadioGroupInput } from "@/app/components/ui/form/RadioGroupInput";

import { useAuthStore } from "@/app/store/useAuthStore";
import { uploadDocument, validateFile } from "@/app/helpers/fileUploader";

type StudentProfileForm = {
  firstName: string;
  lastName: string;
  nationality: string;
  nationalId: string;
  email: string;
  phone: string;
  address: string;
  Gender: string;
  dob: string;
};

export default function CompleteStudentProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore() as any;

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentProfileForm>({
    defaultValues: { nationality: "Kenyan" },
  });

  const nationality = watch("nationality");

  // Prefill with existing user data
  useEffect(() => {
    if (!user) return;
    setValue("firstName", user.firstName ?? "");
    setValue("lastName", user.lastName ?? "");
    setValue("email", user.email ?? "");
    setValue("phone", user.phone ?? "");
    setValue("nationalId", user.nationalId ?? "");
    setValue("nationality", user.nationality ?? "Kenyan");
    setValue("Gender", user.gender ?? "");
    setValue("address", user?.roleObject?.address ?? "");
    setValue("dob", user?.roleObject?.dob ?? "");
  }, [user, setValue]);

  const imageToShow = preview || user?.profilePhoto;

  const handleFile = (selected: File) => {
    const error = validateFile(selected);
    if (error) {
      setUploadError(error);
      return;
    }
    setUploadError(null);
    setFile(selected);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selected);
  };

  const onSubmit = async (data: StudentProfileForm) => {
    setLoading(true);
    setApiError(null);

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        nationality: data.nationality,
        nationalId: data.nationalId,
        email: data.email,
        phone: data.phone,
        address: data.address,
        Gender: data.Gender,
        dob: data.dob,
        Role: "Student",
      };

      const res = await fetch("/api/student/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }

      const result = await res.json();

      if (file && user?.userId) {
        await uploadDocument(file, "Profile Photo", user.userId, "User", "profile_photo");
      }

      setUser({
        ...user,
        ...result?.User,
      });

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        router.push("/student/profile");
      }, 1200);
    } catch (err: any) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Complete Your Profile"
        description="Keep your personal information up to date"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 my-8 space-y-6"
      >
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {/* Profile photo */}
        <div className="space-y-3">
          <label className="text-sm text-gray-700 font-medium">Profile Picture</label>
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full border border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50">
              {imageToShow ? (
                <img src={imageToShow} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <UploadCloud className="text-gray-400" size={22} />
              )}
            </div>
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700">
                <UploadCloud size={16} />
                Upload photo
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/gif"
                  hidden
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
              {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-2 gap-6">
          <FormField label="First Name" error={errors.firstName?.message}>
            <TextInput
              placeholder="First name"
              {...register("firstName", { required: "First name is required" })}
            />
          </FormField>
          <FormField label="Last Name" error={errors.lastName?.message}>
            <TextInput
              placeholder="Last name"
              {...register("lastName", { required: "Last name is required" })}
            />
          </FormField>
        </div>

        {/* Nationality / National ID / Gender / DOB */}
        <div className="grid grid-cols-2 gap-6">
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

          {nationality === "Kenyan" && (
            <FormField label="National ID Number" error={errors.nationalId?.message}>
              <TextInput
                placeholder="Enter National ID Number"
                {...register("nationalId", { required: "National ID is required" })}
              />
            </FormField>
          )}

          <RadioGroupInput
            control={control}
            name="Gender"
            label="Gender"
            error={errors.Gender?.message}
            required="Please select a gender"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />

          <FormField label="Date of Birth" error={errors.dob?.message}>
            <TextInput type="date" {...register("dob", { required: "Date of birth is required" })} />
          </FormField>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-6">
          <FormField label="Email Address" error={errors.email?.message}>
            <TextInput readOnly {...register("email", { required: "Email is required" })} />
          </FormField>

          <PhoneNumberInput
            control={control}
            name="phone"
            label="Phone Number"
            error={errors.phone?.message}
            required="Phone number is required"
          />
        </div>

        {/* Address */}
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

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-2 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
