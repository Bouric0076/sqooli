"use client"; // this ensures Next.js treats it as a client boundary

import dynamic from "next/dynamic";

// Dynamically import the actual page, disable SSR
const AcceptInvitationPage = dynamic(
  () => import("./AcceptInvitationPageClient"),
  { ssr: false } // disables server-side rendering / prerender
);

export default AcceptInvitationPage;
