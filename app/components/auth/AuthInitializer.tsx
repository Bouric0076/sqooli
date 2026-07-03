
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const permissionsLoaded = useAuthStore((s) => s.permissionsLoaded);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !permissionsLoaded) {
      fetchMe();
    }
  }, [fetchMe, permissionsLoaded]);

  return <>{children}</>;
}