"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAuthStore } from "@/app/store/useAuthStore";

function QrcodeComponent() {
  const { user } = useAuthStore();
  const referralCode = user?.referralCode;
  const referralLink = referralCode
    ? `https://sqooli.africa/register?ref=${referralCode}`
    : "";

  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const qrRef = useRef<SVGSVGElement>(null);

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
          text: "Join Sqooli using my referral link!",
          url: referralLink,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      handleCopy();
      alert("Link copied to clipboard (sharing not supported on this device)");
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    // Set canvas size to match QR code
    const size = 250;
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "#ffffff"; // optional: white background
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);

        const pngFile = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngFile;
        link.download = `sqooli_referral.png`;
        link.click();
      }
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  return (
    <div className="bg-purple-50 p-4 rounded-2xl space-y-4 text-center">
      <h3 className="font-semibold text-sm">Refer & Earn with Sqooli</h3>

      {referralLink ? (
        <>
          {/* QR code thumbnail */}
          <div
            className="mx-auto w-max cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <QRCodeSVG value={referralLink} size={100} />
            <p className="text-xs text-gray-500 mt-1">Tap to enlarge</p>
          </div>

          <div className="flex justify-center space-x-2 mt-2">
            <button
              onClick={handleCopy}
              className="bg-white px-3 py-1 text-sm rounded-lg border hover:bg-gray-50"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={handleShare}
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded-lg border hover:bg-blue-700"
            >
              Share
            </button>
          </div>

          {/* Modal with larger QR code */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <h4 className="text-sm font-semibold mb-4">
                  Scan this QR code
                </h4>

                <QRCodeSVG ref={qrRef} value={referralLink} size={250} />
                <p className="text-xs text-gray-500 mt-2 break-all">
                  {referralLink}
                </p>

                <button
                  onClick={handleDownload}
                  className="mt-4 bg-green-600 text-white px-4 py-1 text-sm rounded-lg hover:bg-green-700"
                >
                  Download QR Code
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-xs text-gray-500">No referral code available</p>
      )}
    </div>
  );
}

export default QrcodeComponent;
