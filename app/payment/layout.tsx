// app/onboarding/layout.tsx
"use client";
import React, { use } from "react";
import "../globals.css";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import AuthWrapper from "../components/auth/AuthWrapper";
import MyToaster from "../components/general/Toast/MyToaster";
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-white">
          {/* Sidebar - Visual/Branding */}
          {/* <aside className="hidden lg:flex w-1/3 bg-indigo-600 p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sqooli</h1>
          <p className="mt-4 text-indigo-100 text-lg">
            Empowering your learning journey, one step at a time.
          </p>
        </div>
        <div className="space-y-4">
        
          <div className="text-sm font-medium opacity-70">STEP 01/03</div>
          <div className="h-1 w-full bg-indigo-400 rounded-full overflow-hidden">
            <div className="h-full bg-white w-1/3" />
          </div>
        </div>
      </aside> */}

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col ">
            <MyToaster/>
            <div className="w-full">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
