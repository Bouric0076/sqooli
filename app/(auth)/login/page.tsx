"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import Script from "next/script";
import GoogleLoginButton from "@/app/components/auth/GoogleLoginButton";
import { useOnboardingStore } from "@/app/store/useOnboardingStore";

type LoginForm = {
  email: string;
  password: string;
};

export default function Loginpage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("Login result:", result.email);

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }
      useAuthStore.getState().setUser(result?.user);

      setSuccessMessage(result.message || "Login successful!");

      // Optional auto-hide after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        if (!result?.user?.isEmailConfirmed) {
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
          return;
        }
        const role = result?.user?.userType;

        const schools = result.user?.schools ?? [];
        if (schools.length === 1) {
          useAuthStore.getState().setActiveSchool(schools[0]);
        }

        useOnboardingStore.getState().setBasicInfo({ role: role });
        // console.log("User role:", role);
        // return;
        console.log("User role:", result);

        if (role === "Pending") {
          router.push("/onboarding");
          return;
        }

        switch (role) {
          case "Admin":
            router.push("/admin/dashboard");
            break;
          case "Teacher":
            router.push("/teacher/dashboard");
            break;
          case "Student":
            router.push("/student");
            break;
          case "Parent":
            router.push("/parent");
            break;
          case "SchoolAdmin":
            router.push("/school");
            break;
          default:
            router.push("/onboarding");
        }
      }, 1000);
    } catch (error: any) {
      setApiError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError?: boolean) =>
    hasError ? { borderColor: "#dc2626" } : {};

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white border rounded-lg shadow-md p-3">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Fill in your details to login
          </p>

          {/* Google */}
          {/* <button className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button> */}

          <GoogleLoginButton />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* API Error */}
            {apiError && (
              <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {apiError}
              </div>
            )}

            {/* Success message */}
            {successMessage && (
              <div className="md:col-span-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm flex items-start gap-2">
                <span className="text-green-600 font-semibold">✓</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Email */}
            <div className="md:col-span-2">
              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                className="input "
                style={inputStyle(!!errors.email)}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            {/* Forgot Password */}
            <div className="md:col-span-2 text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            {/* Password */}
            <div className="relative md:col-span-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 8 chars)"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
                className="input pr-10"
                style={inputStyle(!!errors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Login in..." : "Login"}
              </button>
            </div>

            {/* Sign Up */}
            <div className="md:col-span-2 text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Sign Up
                </a>
              </span>
            </div>
          </form>
        </div>

        {/* ORIGINAL styles – unchanged */}
        <style jsx global>{`
          .input {
            width: 100%;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            padding: 0.5rem 0.75rem;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
          .error {
            font-size: 0.75rem;
            color: #dc2626;
            margin-top: 0.25rem;
          }
        `}</style>
      </div>
    </>
  );
}
