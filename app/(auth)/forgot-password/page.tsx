"use client";

import { inputStyle } from '@/app/theme/input';
import { register } from 'module';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type ForgotPasswordForm = {
  email: string;
};


function page() {

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<ForgotPasswordForm>();

      const [loading, setLoading] = useState(false);
      const [apiError, setApiError] = useState<string | null>(null);
      const [successMessage, setSuccessMessage] = useState<string | null>(null);
      const router = useRouter();


      
        const onSubmit = async (data: ForgotPasswordForm) => {
          setLoading(true);
          setApiError(null);
          setSuccessMessage(null);
          try {
            const res = await fetch("/api/auth/forgot-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            const result = await res.json();
            if (res.ok) {
              setSuccessMessage("Password reset sent to your email.");
            } else {
              setApiError(result.message || "Failed to send password reset link.");
            }
          } catch (error) {
            setApiError("Unable to connect to backend.");
          } finally {
            setLoading(false);
          }
        };
          
    return (
        <div>
                <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white border rounded-lg shadow-md p-3">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Forgot Password
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Enter your email to reset your password
          </p>  
         
      

  

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-400">Reset</span>
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
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Remembered your password? Login
              </a>
            </div>
            {/* Password */}
   

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Reseting..." : "Reset Password"}
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
        </div>
    );
}

export default page;