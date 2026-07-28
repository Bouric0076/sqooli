"use client";

import { ShowToast } from "@/lib/toast";
import { useEffect } from "react";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Vavava",error);

    ShowToast.error(error.message || "Something went wrong.");
  }, [error]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">
          Something went wrong
        </h1>

        <p>{error.message}</p>

        <button
          onClick={() => reset()}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}