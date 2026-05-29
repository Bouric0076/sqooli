"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthStore } from "@/app/store/useAuthStore";
import { XCircle } from "lucide-react";
import { useOnboardingStore } from "@/app/store/useOnboardingStore";

interface GoogleLoginButtonProps {
  redirectTo?: string;
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  redirectTo = "/onboarding",
  className = "",
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-hide error
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      setError("Google login failed: no credential received.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      const result = await res.json();

      if (!res.ok) {
        switch (res.status) {
          case 403:
            throw new Error(
              "Access denied. Your Google account is not authorized."
            );
          case 401:
            throw new Error("Authentication failed. Invalid credentials.");
          case 502:
            throw new Error("Unable to connect to backend. Try again later.");
          default:
            throw new Error(result.message || "Login failed");
        }
      }

      // Save user
      useAuthStore.getState().setUser(result.user);

      // Email verification
      if (!result.user.isEmailConfirmed) {
        router.push(
          `/verify-email?email=${encodeURIComponent(result.user.email)}`
        );
        return;
      }

      const role = result.user.userType;
      const schools = result.user?.schools ?? [];

      if (schools.length === 1) {
        useAuthStore.getState().setActiveSchool(schools[0]);
      }
      useOnboardingStore.getState().setBasicInfo({ role: role });

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
          router.push(redirectTo);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Error Alert */}
      {error && (
        <div className="mb-3 w-full max-w-md flex items-start gap-2 border border-red-300 bg-red-50 text-red-700 px-4 py-3 rounded relative">
          <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm flex-1">{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* <button className="mt-6 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-50">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
        />
        Continue with Google
      </button> */}

      {/* Google Login Button */}
      <div className={`mt-5 w-full max-w-md ${className}`}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => setError("Google login failed. Please try again.")}
          useOneTap={false}
          theme="outline"
          size="large"
          width="100%"
        />
      </div>

      {loading && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
          Signing in...
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
