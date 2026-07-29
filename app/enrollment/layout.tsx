// app/onboarding/layout.tsx
"use client";
import React, { use } from "react";
import "../globals.css";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import AuthWrapper from "../components/auth/AuthWrapper";
import "react-phone-input-2/lib/style.css";
import MyToaster from "../components/general/Toast/MyToaster";
import GlobalSpinner from "@/components/GlobalSpinner";
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-white">

 <MyToaster/>   
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full    ">
                <GlobalSpinner/>
            {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
