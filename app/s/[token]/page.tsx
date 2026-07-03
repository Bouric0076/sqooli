"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle, XCircle, Loader2, Link2 } from "lucide-react";
import { useParams } from "next/navigation";
import { resolveUrlToken } from "@/app/lib/url";
// If you are using React Router, uncomment this:
// import { useParams } from "react-router-dom";

type ResolveStatus = "resolving" | "redirecting" | "failed";

export default function UrlShortenerPage() {
  const [status, setStatus] = useState<ResolveStatus>("resolving");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const params = useParams();
      const token = params.token as string;

  // If using Next.js App Router, the shortCode often comes from `params`
  // If using React Router: const { shortCode } = useParams<{ shortCode: string }>();
  const shortCode = token || "unknown";

  const resolveUrl = useCallback(async () => {
    setErrorMessage(null);

    if (!shortCode || shortCode === "unknown") {
      setStatus("failed");
      setErrorMessage("Missing URL code");
      return;
    }

    try {
      setStatus("resolving");

      // Replace with your actual backend endpoint URL
      const res = await resolveUrlToken(shortCode);


    //   console.log(res)

      if (res.status === false) {
        throw new Error(res?.message || "The shortened URL does not exist.");
      }

      if (res?.status === true) {
        setStatus("redirecting");
        
        // Auto-redirect after a short delay so the user sees the success state
        setTimeout(() => {
          window.location.href = res.url;
        }, 1200);
      }
    } catch (error: any) {
      console.error("URL resolution error:", error);
      setStatus("failed");
      setErrorMessage(error.message || "Unable to resolve URL");
      
      // Fallback redirect to the 404 page
    //   setTimeout(() => {
    //     window.location.href = "https://sqooli.africa/not-found";
    //   }, 2000);
    }
  }, [shortCode]);

  useEffect(() => {
    resolveUrl();
  }, [resolveUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 text-center transition-all">
        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-indigo-50">
            <Link2 className="h-7 w-7 text-indigo-600" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-gray-900">
          Sqooli Link Resolver
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Secure URL redirection
        </p>

        {/* Dynamic Status Section */}
        <div className="mt-6 min-h-[140px] flex flex-col justify-center">
          {status === "resolving" && (
            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-sm text-gray-600">
                Finding your destination…
              </p>
            </div>
          )}

          {status === "redirecting" && (
            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <p className="text-green-700 font-medium">
                URL found! Taking you there…
              </p>
              <div className="mt-1 text-xs text-gray-400 flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Redirecting automatically
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-300">
              <XCircle className="h-10 w-10 text-red-600" />
              <p className="text-red-600 font-medium">
                {errorMessage || "Link could not be resolved"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Redirecting to homepage...
              </p>
            </div>
          )}
        </div>

        {/* Short Code Display */}
        {shortCode && shortCode !== "unknown" && (
          <div className="mt-6 text-xs text-gray-500 bg-gray-50 rounded-lg p-3 text-left flex justify-between items-center border border-gray-100">
            <span>Link Code</span>
            <span className="font-mono text-gray-700 font-medium bg-white px-2 py-1 rounded shadow-sm border border-gray-200">
              {shortCode}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}