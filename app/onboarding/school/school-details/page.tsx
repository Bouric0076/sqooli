"use client";
import React, { useState } from "react";
import { Upload, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import { useOnboardingStore } from "@/app/store/useOnboardingStore";

type FormValues = {
  schoolName: string;
  Motto: string;
  Code: string;
  Email: string;
  Website: string;
  description: string;
  logo: File | null;
  county: string;
  city: string;
  address: string;
  adminEmail: string;
  Phone: string;
};

export default function SchoolRegistrationForm() {
  const { user } = useAuthStore();
  const { schoolEnrollment } = useOnboardingStore();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      schoolName: "",
      Motto: "",
      Code: "",
      Email: "",
      Website: "",
      description: "",
      logo: null,
      county: "",
      city: "",
      address: "",
      adminEmail: user?.email || "",
      Phone: "+254",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    // const updatedSchoolEnrollment = {
    //   ...schoolEnrollment,
    //   schoolName: data.schoolName,
    //   Motto: data.Motto,
    //   Code: data.Code,
    //   schoolEmail: data.schoolEmail,
    //   Website: data.Website,
    //   description: data.description,
    //   LogoPath: data.logo,
    //   county: data.county,
    //   city: data.city,
    //   address: data.address,
    //   adminEmail: data.adminEmail,
    //   Phone: data.Phone,
    // };

    try {
      const payload = {
        ...data,
        role: "schoolAdmin",
        schoolTypeId: schoolEnrollment?.schoolTypeId,
        curriculumIds: schoolEnrollment?.curriculumIds,
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
        router.push("/school");
      }, 1500);
    } catch (error: any) {
      setApiError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError?: boolean) =>
    hasError ? { borderColor: "#dc2626" } : {};

  return (
    <div className="min-h-screen w-full relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center z-50 rounded-xl">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-blue-600 font-medium">Submitting...</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-12">
        {/* Success & Error Messages */}
        {apiError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm flex items-center gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Logo */}
        <div>
          <img src="/logo.svg" alt="Sqooli Logo" className="h-2 mb-6" />
          <img src="/logo.svg" alt="Sqooli Logo" className="h-14 mb-6" />
        </div>

        <h1 className="text-xl font-normal text-center mb-12 text-gray-900">
          Add the following details of your school {user?.firstName}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* School Details */}
          <div className="mb-10">
            <h2 className="text-base font-semibold mb-6 text-gray-900">
              School Details
            </h2>
            <div className="space-y-5">
              {/* School Name */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Name of School
                </label>
                <input
                  type="text"
                  {...register("schoolName", {
                    required: "School name is required",
                  })}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  style={inputStyle(!!errors.schoolName)}
                />
                {errors.schoolName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.schoolName.message}
                  </p>
                )}
              </div>

              {/* School Motto */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  School Motto (optional)
                </label>
                <input
                  type="text"
                  {...register("Motto")}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>

              {/* Code & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2">
                    School Code
                  </label>
                  <input
                    type="text"
                    {...register("Code", {
                      required: "School code is required",
                    })}
                    className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    style={inputStyle(!!errors.Code)}
                  />
                  {errors.Code && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.Code.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2">
                    School Email
                  </label>
                  <input
                    type="email"
                    {...register("Email", {
                      required: "School email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                    style={inputStyle(!!errors.Email)}
                  />
                  {errors.Email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.Email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  School Website (optional)
                </label>
                <input
                  type="url"
                  {...register("Website")}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Enter a short description of the school..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-3xl bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm placeholder-gray-400"
                  style={inputStyle(!!errors.description)}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Logo */}
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Logo (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50">
                  <input
                    type="file"
                    id="logo-upload"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files &&
                      setValue("logo", e.target.files[0], {
                        shouldValidate: true,
                      })
                    }
                    className="hidden"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Upload className="text-gray-400" size={24} />
                    </div>
                    <p className="text-sm mb-1">
                      <span className="text-blue-500 font-medium">
                        Click to upload
                      </span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                    {watch("logo") && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {watch("logo")?.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Address Section */}
          <div className="mb-10">
            <h2 className="text-base font-semibold mb-1 text-gray-900">
              Physical Address
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Add physical address details
            </p>

            <div className="space-y-5">
              {/* <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2">
                    County
                  </label>
                  <select
                    {...register("county", { required: "County is required" })}
                    className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none text-sm text-gray-400 pr-10"
                    style={inputStyle(!!errors.county)}
                  >
                    <option value="">Select...</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                  </select>
                  {errors.county && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.county.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    {...register("city", { required: "City is required" })}
                    className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none text-sm text-gray-400 pr-10"
                    style={inputStyle(!!errors.city)}
                  >
                    <option value="">Select...</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                  </select>
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div> */}

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-3xl bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm"
                  style={inputStyle(!!errors.address)}
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Admin Details */}
          <div className="mb-10">
            <h2 className="text-base font-semibold mb-1 text-gray-900">
              Admin Details
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Admin will receive instructions to complete school profile
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Official Email Address
                </label>
                <input
                  type="email"
                  {...register("adminEmail")}
                  className="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">
                  Official Phone Number
                </label>
                <div className="w-full px-4 py-2 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm">
                  <Controller
                    control={control}
                    name="adminPhone"
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                      <PhoneInput
                        country={"ke"}
                        value={field.value}
                        onChange={(phone) => field.onChange("+" + phone)}
                        inputStyle={{
                          border: "none",
                          width: "100%",
                          backgroundColor: "transparent",
                        }}
                      />
                    )}
                  />
                </div>
                {errors.adminPhone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.adminPhone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => router.back()}
              type="button"
              className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-full transition-colors text-sm font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium shadow-md"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Save & Submit
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
