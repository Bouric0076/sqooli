"use client";

import GoogleLoginButton from "@/app/components/auth/GoogleLoginButton";
import React from "react";

export default function GoogleLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign in with Google
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Use your Google account to continue
        </p>

        <div className="mt-6">
          <GoogleLoginButton redirectTo="/dashboard" />
        </div>

        {/* Optional: Divider for alternative login */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Optional: Link to email/password login */}
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Or{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              login with email
            </a>
          </span>
        </div>
      </div>

      {/* Original styles – unchanged */}
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}
