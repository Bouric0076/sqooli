"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  //   useEffect(() => {
  //     const token = localStorage.getItem("access_token");

  //     if (!user || !token) {
  //       // Clear client storage
  //       localStorage.clear();
  //       Cookies.remove("access_token");

  //       // Clear Zustand
  //       logout();

  //       // Redirect
  //       //   router.replace("/login");
  //     }
  //   }, [user, logout, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-sm text-gray-600">
        Please log in to continue onboarding.
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthWrapper;
