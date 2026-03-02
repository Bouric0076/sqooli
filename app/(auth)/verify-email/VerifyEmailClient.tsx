"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";

type Status = "pending" | "verifying" | "success" | "error" | "resending";

export default function VerifyEmailClient() {
  const params = useSearchParams();
  const router = useRouter();

  const email = params?.get("email");
  const userId = params?.get("userId");
  const token = params?.get("token");

  const [status, setStatus] = useState<Status>(
    userId && token ? "verifying" : "pending"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId || !token) return;

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, token }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setStatus("success");
        setMessage("Your email has been successfully verified.");
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message || "Verification failed.");
      }
    };

    verifyEmail();
  }, [userId, token]);

  const handleResend = async () => {
    if (!email) return;

    setStatus("resending");

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus("pending");
      setMessage("Verification email resent successfully.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Failed to resend verification email.");
    }
  };

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => router.push("/login"), 3000);
    return () => clearTimeout(t);
  }, [status, router]);

  const icon = {
    verifying: <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />,
    resending: <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />,
    success: <CheckCircle className="w-8 h-8 text-green-600" />,
    error: <XCircle className="w-8 h-8 text-red-600" />,
    pending: <Mail className="w-8 h-8 text-blue-600" />,
  }[status];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            {icon}
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          {status === "success"
            ? "Email Verified"
            : status === "verifying"
            ? "Verifying Email"
            : status === "resending"
            ? "Sending Email"
            : status === "error"
            ? "Verification Failed"
            : "Check Your Email"}
        </h1>

        {/* MESSAGE */}
        <p className="text-center text-gray-600 mb-6">
          {message || "We’ve sent a verification link to your email address."}
        </p>

        {/* EMAIL */}
        {email && (
          <div className="bg-gray-50 p-4 rounded-lg flex gap-3 items-center mb-6">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-700 font-medium">{email}</span>
          </div>
        )}

        {/* ACTIONS */}
        <div className="space-y-3">
          {status === "success" && (
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700"
            >
              Continue to Login
            </button>
          )}

          {email && (status === "pending" || status === "error") && (
            <button
              onClick={handleResend}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700"
            >
              Resend verification email
            </button>
          )}

          {status === "resending" && (
            <button
              disabled
              className="w-full bg-blue-400 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </button>
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
          Need help?{" "}
          <a href="/support" className="text-blue-600 font-medium">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
