"use client"; // ensures client boundary

import dynamic from "next/dynamic";

// Dynamically load the client-only component
const VerifyEmailPage = dynamic(
  () => import("./VerifyEmailClient"),
  { ssr: false } // disables server-side rendering / prerender
);

export default VerifyEmailPage;
