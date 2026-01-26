"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Registerpage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setSuccessMessage(
        "Your account has been created successfully. Please check your email to continue."
      );

      // Optional auto-hide after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }, 5000);
    } catch (error: any) {
      setApiError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (hasError?: boolean) =>
    hasError ? { borderColor: "#dc2626" } : {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-3">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Fill in your details to register
        </p>

        {/* Google */}
        <button className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

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

          {/* First Name */}
          <div>
            <input
              placeholder="First name"
              {...register("firstName", { required: "First name is required" })}
              className="input"
              style={inputStyle(!!errors.firstName)}
            />
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              placeholder="Last name"
              {...register("lastName", { required: "Last name is required" })}
              className="input"
              style={inputStyle(!!errors.lastName)}
            />
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
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
              className="input"
              style={inputStyle(!!errors.email)}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              placeholder="+254 7XX XXX XXX"
              {...register("phone", { required: "Phone number is required" })}
              className="input"
              style={inputStyle(!!errors.phone)}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
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

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (v) => v === password || "Passwords do not match",
              })}
              className="input pr-10"
              style={inputStyle(!!errors.confirmPassword)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-sm text-blue-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
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
              {loading ? "Registering..." : "Register"}
            </button>
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
  );
}
