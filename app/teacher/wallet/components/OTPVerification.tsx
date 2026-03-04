import React from "react";
import { X } from "lucide-react";

interface OTPVerificationProps {
  // You can add props here if needed, such as onClose callback
  show: boolean;
  setShow: (show: boolean) => void;
}
function OTPVerification({ show, setShow }: OTPVerificationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      {/* Modal */}
      <div className="relative w-[640px] bg-white rounded-2xl shadow-xl px-8 py-7">
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-[20px] font-semibold text-gray-900">
          OTP Verification
        </h2>

        {/* Subtitle */}
        <p className="mt-1 text-[14px] text-gray-500">
          We have sent a verification code to your phone number and email
          address
        </p>

        {/* Input Section */}
        <div className="mt-6">
          <label className="block text-[14px] text-gray-700 mb-2">
            Enter OTP
          </label>

          <input
            type="text"
            placeholder="********"
            className="w-full h-[48px] text-gray-500 rounded-full border border-gray-200 px-5 text-[14px] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
          />
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-end">
          <button className="h-[42px] px-8 rounded-full bg-purple-600 text-white text-[14px] font-medium hover:bg-purple-700 transition">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
