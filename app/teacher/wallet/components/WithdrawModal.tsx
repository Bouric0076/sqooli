"use client";
import React, { useState } from "react";
import WalletActivation from "./WalletActivation";

export default function WalletSetupModal() {
  const [open, setOpen] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("mobile");
  const [provider, setProvider] = useState("mpesa");
  const [mpesaOption, setMpesaOption] = useState("phone");

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex gap-3 mt-6">
        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm">
          Withdraw
        </button>

        <button
          onClick={() => setOpen(true)}
          className="bg-white/20 px-4 py-2 rounded-lg border border-white/30 text-sm"
        >
          Edit
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-[640px] rounded-2xl p-6 relative shadow-lg">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 text-gray-400 text-lg"
            >
              ✕
            </button>

            {/* Header */}
            <h2 className="text-lg font-semibold text-gray-900">
              Activate Wallet
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Setup withdrawal settings to access your earnings
            </p>

            {/* Steps */}
            <div className="grid grid-cols-3 gap-6 mb-8 text-xs">
              <div>
                <p className="font-semibold text-gray-900">
                  Setup Withdrawal Method
                </p>
                <p className="text-gray-400 mt-1 leading-relaxed">
                  Setup how you will withdraw earnings from your account
                </p>
                <div className="h-[2px] bg-purple-600 w-28 mt-3 rounded-full" />
              </div>

              <div>
                <p className="font-medium text-gray-400">Setup Top-up Method</p>
                <p className="text-gray-400 mt-1 leading-relaxed">
                  Setup how you will withdraw earnings
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-400">PIN Setup</p>
                <p className="text-gray-400 mt-1 leading-relaxed">
                  Setup your wallet PIN
                </p>
              </div>
            </div>

            {/* Withdrawal Method */}
            <p className="text-sm font-medium text-gray-900 mb-4">
              Select withdrawal method
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* Mobile */}
              <div
                onClick={() => setSelectedMethod("mobile")}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  selectedMethod === "mobile"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <p className="text-sm font-semibold text-gray-900">
                  Mobile Money
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Setup withdrawal method manually through mobile money
                </p>
              </div>

              {/* Bank */}
              <div
                onClick={() => setSelectedMethod("bank")}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  selectedMethod === "bank"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <p className="text-sm font-semibold text-gray-900">
                  Bank Account
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Withdraw your earnings directly to bank account
                </p>
              </div>

              {/* Others */}
              {/* <div
                onClick={() => setSelectedMethod("others")}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  selectedMethod === "others"
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <p className="text-sm font-semibold text-gray-900">Others</p>
                <p className="text-xs text-gray-400 mt-1">
                  Use other methods to withdraw your earnings
                </p>
              </div> */}
            </div>

            {/* ================= MOBILE MONEY ================= */}
            {selectedMethod === "mobile" && (
              <>
                <p className="text-sm font-medium mb-3 text-gray-500">
                  Select method
                </p>

                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setProvider("mpesa")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      provider === "mpesa"
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    MPESA
                  </button>

                  <button
                    onClick={() => setProvider("airtel")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      provider === "airtel"
                        ? "border-purple-600 bg-purple-50 text-purple-600"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    Airtel Money
                  </button>
                </div>

                {/* ================= MPESA OPTIONS ================= */}
                {provider === "mpesa" && (
                  <>
                    <p className="text-sm font-medium mb-3 text-gray-500">
                      MPESA Withdrawal Option
                    </p>

                    <div className="flex gap-3 flex-wrap mb-6">
                      <button
                        onClick={() => setMpesaOption("phone")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          mpesaOption === "phone"
                            ? "border-purple-600 bg-purple-50 text-purple-600"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        Phone Number
                      </button>

                      <button
                        onClick={() => setMpesaOption("till")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          mpesaOption === "till"
                            ? "border-purple-600 bg-purple-50 text-purple-600"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        Till Number
                      </button>

                      <button
                        onClick={() => setMpesaOption("paybill")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          mpesaOption === "paybill"
                            ? "border-purple-600 bg-purple-50 text-purple-600"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        Paybill Number
                      </button>
                    </div>

                    {/* PHONE OPTION */}
                    {mpesaOption === "phone" && (
                      <>
                        <p className="text-sm font-medium mb-2 text-gray-500">
                          MPESA Phone Number
                        </p>
                        <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 text-sm mb-6">
                          <span className="mr-2">🇰🇪</span>
                          <span className="text-gray-500 mr-2">+254</span>
                          <input
                            placeholder="7XXXXXXXX"
                            className="flex-1 outline-none text-sm text-gray-500"
                          />
                        </div>
                      </>
                    )}

                    {/* TILL OPTION */}
                    {mpesaOption === "till" && (
                      <>
                        <p className="text-sm font-medium mb-2 text-gray-500">
                          Till Number
                        </p>
                        <input
                          placeholder="Enter Till Number"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-6 outline-none text-gray-500"
                        />
                      </>
                    )}

                    {/* PAYBILL OPTION */}
                    {mpesaOption === "paybill" && (
                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-sm font-medium mb-2 text-gray-500">
                            Paybill Number
                          </p>
                          <input
                            placeholder="Enter Paybill Number"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none text-gray-500"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2 text-gray-500">
                            Account Number
                          </p>
                          <input
                            placeholder="Enter Account Number"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none text-gray-500"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* ================= AIRTEL ================= */}
                {provider === "airtel" && (
                  <>
                    <p className="text-sm font-medium mb-2 text-gray-500">
                      Airtel Money Phone Number
                    </p>
                    <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 text-sm mb-6">
                      <span className="mr-2">🇰🇪</span>
                      <span className="text-gray-500 mr-2">+254</span>
                      <input
                        placeholder="7XXXXXXXX"
                        className="flex-1 outline-none text-sm"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* ================= BANK ================= */}
            {selectedMethod === "bank" && (
              <div className="space-y-6 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Bank Paybill Number
                  </p>
                  <input
                    type="number"
                    placeholder="Enter Bank Paybill Number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Bank Account Number
                  </p>
                  <input
                    type="text"
                    placeholder="Enter Bank Account Number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                  />
                </div>
              </div>
            )}

            {/* ================= OTHERS ================= */}
            {selectedMethod === "others" && (
              <div className="mb-6 space-y-3">
                <p className="text-sm font-medium text-gray-900">
                  Other Withdrawal Method
                </p>
                <p className="text-xs text-gray-400">
                  Provide the necessary details for your preferred withdrawal
                  method.
                </p>
                <input
                  placeholder="Enter withdrawal details"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end mt-10">
              <button
                onClick={() => setOpenPinModal(true)}
                className="bg-purple-600 text-white text-sm px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Save & Continue
              </button>
            </div>
          </div>

          {openPinModal && (
            <WalletActivation
              showModal={openPinModal}
              setShowModal={setOpenPinModal}
            />
          )}
        </div>
      )}
    </>
  );
}
