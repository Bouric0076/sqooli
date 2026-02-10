"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle, XCircle, Loader2, CreditCard } from "lucide-react";

type PaymentStatus = "verifying" | "success" | "failed";

export default function VerifyPaymentPage() {
  const [status, setStatus] = useState<PaymentStatus>("verifying");
  const [reference, setReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const verifyPayment = useCallback(async () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference");

    setReference(ref);
    setErrorMessage(null);

    if (!ref) {
      setStatus("failed");
      setErrorMessage("Missing payment reference");
      return;
    }

    try {
      setStatus("verifying");

      const res = await fetch(`/api/paystack/verify?reference=${ref}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Verification failed");
      }

      if (data?.status === true) {
        setStatus("success");
      } else {
        setStatus("failed");
        setErrorMessage("Payment not successful");
      }
    } catch (error: any) {
      console.error("Payment verification error:", error);
      setStatus("failed");
      setErrorMessage(error.message || "Unable to verify payment");
    }
  }, []);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-gray-100">
            <CreditCard className="h-7 w-7 text-gray-600" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Verifying Payment
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Paystack payment verification
        </p>

        <div className="mt-6">
          {status === "verifying" && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-sm text-gray-600">
                Please wait while we confirm your payment…
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <p className="text-green-700 font-medium">
                Payment verified successfully
              </p>
            </div>
          )}

          {status === "failed" && (
            <div className="flex flex-col items-center gap-3">
              <XCircle className="h-10 w-10 text-red-600" />
              <p className="text-red-600 font-medium">
                {errorMessage || "Payment verification failed"}
              </p>

              {/* Retry Button */}
              <button
                onClick={verifyPayment}
                className="mt-2 rounded-lg border border-indigo-600 text-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-50 transition"
              >
                Retry verification
              </button>
            </div>
          )}
        </div>

        {reference && (
          <div className="mt-6 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            <p>Payment Reference</p>
            <p className="font-mono text-gray-700 break-all">{reference}</p>
          </div>
        )}

        {/* Continue ONLY after success */}
        {status === "success" && (
          <div className="mt-6">
            <button
              className="w-full rounded-lg bg-indigo-600 text-white py-2.5 text-sm font-medium hover:bg-indigo-700 transition"
              onClick={() => (window.location.href = "/student/lessons")}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
