// lib/errorHandler.ts

import { useErrorStore } from "@/app/store/errorStore";



export function errorShow(error: unknown) {


  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Something went wrong";

  useErrorStore.getState().setError(message);
}