"use client";

import { useEffect } from "react";
import { ShowToast } from "./toast";
import { useErrorStore } from "@/app/store/errorStore";
import { useRouter } from "next/navigation";


export default function GlobalErrorHandler() {
  const { error, clearError } = useErrorStore();

  const router = useRouter();

    useEffect(() => {
    async function handleError() {
        if (!error) return;

        const Cookies = (await import("js-cookie")).default;
        const token = Cookies.get("access_token");

        if (!token) {
            router.replace('/login')
        }

        ShowToast.error(error);
        clearError();
    }

    handleError();
    }, [error, clearError]);

  return null;
}