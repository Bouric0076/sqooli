"use client";
import React, { useState } from "react";

export default function WalletSetupModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [withdrawMethod, setWithdrawMethod] = useState("mobile");
  const [provider, setProvider] = useState("mpesa");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex gap-3 mt-6">
        <button className="bg-white text-purple-600 px-4 py-2 rounded-xl font-medium">
          Withdraw
        </button>

        <button
          onClick={() => setOpen(true)}
          className="bg-white/20 px-4 py-2 rounded-xl border border-white/30"
        >
          Edit
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 md:p-8 relative shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-xl md:text-2xl font-semibold">
              Activate Wallet
            </h2>
            <p className="text-sm text-gray-500 mt-1 mb-8">
              Setup withdrawal settings to access your earnings
            </p>

            {/* Steps Indicator */}
            <div className="grid grid-cols-3 gap-4 mb-10 text-sm">
              {[
                "Setup Withdrawal Method",
                "Setup Top-up Method",
                "PIN Setup",
              ].map((title, index) => {
                const current = index + 1;
                const active = step === current;
                const completed = step > current;

                return (
                  <div key={index}>
                    <p
                      className={`font-semibold ${
                        active
                          ? "text-gray-900"
                          : completed
                          ? "text-purple-600"
                          : "text-gray-400"
                      }`}
                    >
                      {title}
                    </p>

                    <div
                      className={`h-1 mt-3 rounded-full transition-all ${
                        active || completed ? "bg-purple-600" : "bg-gray-200"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <p className="text-sm font-medium mb-4">
                  Select withdrawal method
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  {["mobile", "bank", "others"].map((type) => (
                    <div
                      key={type}
                      onClick={() => setWithdrawMethod(type)}
                      className={`border rounded-2xl p-5 cursor-pointer transition ${
                        withdrawMethod === type
                          ? "border-purple-600 ring-2 ring-purple-100"
                          : "border-gray-200"
                      }`}
                    >
                      <p className="font-semibold capitalize">
                        {type === "mobile"
                          ? "Mobile Money"
                          : type === "bank"
                          ? "Bank Account"
                          : "Others"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Setup withdrawal via {type}
                      </p>
                    </div>
                  ))}
                </div>

                {withdrawMethod === "mobile" && (
                  <>
                    <p className="text-sm font-medium mb-3">Select method</p>

                    <div className="flex gap-3 mb-6">
                      {["mpesa", "airtel"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setProvider(p)}
                          className={`px-4 py-2 rounded-lg text-sm border ${
                            provider === p
                              ? "border-purple-600 bg-purple-50 text-purple-600 font-medium"
                              : "border-gray-200"
                          }`}
                        >
                          {p === "mpesa" ? "MPESA" : "Airtel Money"}
                        </button>
                      ))}
                    </div>

                    <p className="text-sm font-medium mb-2">
                      MPESA Phone Number
                    </p>

                    <div className="flex items-center border rounded-xl px-4 py-3 text-sm">
                      <span className="mr-2">🇰🇪</span>
                      <span className="text-gray-500 mr-2">+254</span>
                      <input
                        placeholder="7XXXXXXXX"
                        className="flex-1 outline-none"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <p className="text-sm font-medium mb-4">Setup Top-up Method</p>

                <div className="border rounded-xl p-6 text-gray-500 text-sm">
                  (Top-up settings content goes here)
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <p className="text-sm font-medium mb-4">Setup Wallet PIN</p>

                <input
                  type="password"
                  maxLength={4}
                  placeholder="Enter 4-digit PIN"
                  className="border rounded-xl px-4 py-3 w-full outline-none"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={step === 3 ? () => setOpen(false) : nextStep}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition"
              >
                {step === 3 ? "Finish" : "Save & Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
