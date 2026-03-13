"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import React, { useState } from "react";

function ReferralComponent() {
  const { user } = useAuthStore();
  const referralCode = user?.referralCode;

  const referralLink = referralCode
    ? `https://sqooli.africa/register?ref=${referralCode}`
    : "";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!referralLink) return;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = referralLink;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleShare = async () => {
    if (!referralLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Sqooli",
          text: "Join Sqooli using my referral link and start learning!",
          url: referralLink,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      // fallback: copy link if share API isn't available
      handleCopy();
      alert("Link copied to clipboard (sharing not supported on this device)");
    }
  };

  return (
    <div className="bg-purple-50 p-4 rounded-2xl space-y-2">
      <h3 className="font-semibold text-sm">Refer & Earn with Sqooli</h3>

      <p className="text-xs text-gray-600">
        Share your unique link to students & parents to join Sqooli
      </p>

      <div className="flex space-x-2">
        <button
          onClick={handleCopy}
          className="bg-white px-3 py-1 text-sm rounded-lg border hover:bg-gray-50"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>

        <button
          onClick={handleShare}
          className="bg-purple-600 text-white px-3 py-1 text-sm rounded-lg border hover:bg-blue-500"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default ReferralComponent;
