"use client";
import React, { Suspense } from "react";
import "../globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-white">
          {/* Sidebar - Visual/Branding with animated image */}
          <aside className="relative flex-col justify-between text-white hidden md:flex w-1/4 lg:w-3/6 overflow-hidden">
            {/* Animated Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center animate-fadeScale"
              style={{
                backgroundImage:
                  "url('https://sqooli.com/assets/student.43e8510c.png')",
              }}
            />

            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Sidebar content */}
            <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-between h-full">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Sqooli</h1>
                <p className="mt-4 text-indigo-100 text-lg italic">
                  Empowering your learning journey, one step at a time.
                </p>
              </div>
              <div className="space-y-4 mb-20">
                <div className="text-sm font-medium opacity-70">STEP 01/03</div>
                <div className="h-1 w-full bg-indigo-400 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <div className="w-full max-w-xl">{children}</div>
              </Suspense>
            </GoogleOAuthProvider>
          </main>
        </div>

        {/* Tailwind keyframes + animation */}
        <style jsx global>{`
          @keyframes fadeScale {
            0%,
            100% {
              opacity: 0.8;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
          }

          .animate-fadeScale {
            animation: fadeScale 8s ease-in-out infinite;
          }
        `}</style>
      </body>
    </html>
  );
}
