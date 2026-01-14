"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

  const password = watch("password");

  const onSubmit = (data: RegisterForm) => {
    console.log("Form data:", data);
    alert("Registration successful ✅");
  };

  // 🔴 INLINE border override (fixes Tailwind + CSS conflict)
  const inputStyle = (hasError?: boolean) =>
    hasError ? { borderColor: "#dc2626" } : {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
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
          {/* First Name */}
          <div>
            <input
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
              })}
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
              {...register("lastName", {
                required: "Last name is required",
              })}
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
              {...register("phone", {
                required: "Phone number is required",
              })}
              className="input"
              style={inputStyle(!!errors.phone)}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          {/* Username */}
          <div>
            <input
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
              className="input"
              style={inputStyle(!!errors.username)}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 chars)"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
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
          <div className="relative md:col-span-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
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
            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
              Register
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
