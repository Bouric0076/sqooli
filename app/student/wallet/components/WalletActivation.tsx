"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import OTPVerification from "./OTPVerification";

interface WalletActivationProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export default function WalletActivation({
  showModal,
  setShowModal,
}: WalletActivationProps) {
  const [activeTab, setActiveTab] = useState<"withdrawal" | "pin">("pin");
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const pinRefs = useRef<HTMLInputElement[]>([]);
  const confirmRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    index: number,
    value: string,
    arr: string[],
    setArr: Function,
    refs: any
  ) => {
    if (!/^\d?$/.test(value)) return;

    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);

    if (value && index < 5) refs.current[index + 1].focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    arr: string[],
    setArr: Function,
    refs: any
  ) => {
    if (e.key === "Backspace" && !arr[index] && index > 0) {
      refs.current[index - 1].focus();
    }
  };

  const isComplete = pin.every(Boolean) && confirmPin.every(Boolean);
  const isMatch = pin.join("") === confirmPin.join("");

  useEffect(() => {
    if (activeTab == "withdrawal") {
      setShowModal(false);
    }
  }, [activeTab]);

  const handleSubmit = () => {
    if (!isMatch) {
      setError("PINs do not match");
      return;
    }
    setError("");
    console.log("PIN:", pin.join(""));
    setShowOtp(true);

    // Delay closing wallet modal for smoother transition
    // setTimeout(() => {
    //   setShowModal(false);
    // }, 200);
  };

  const renderPinRow = (arr: string[], setArr: Function, refs: any) => (
    <div className="flex gap-4">
      {arr.map((v, i) => (
        <motion.div
          key={i}
          whileTap={{ scale: 0.9 }}
          className={`relative w-10 h-10 rounded border bg-gray-50 flex items-center justify-center
            transition-all duration-200
            ${v ? "" : "border-gray-300"}
          `}
        >
          {v && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 bg-purple-600 rounded-full"
            />
          )}
          <input
            ref={(el) => (refs.current[i] = el!)}
            type="password"
            maxLength={1}
            value={v}
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleChange(i, e.target.value, arr, setArr, refs)}
            onKeyDown={(e) => handleKeyDown(e, i, arr, setArr, refs)}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-[680px] p-8 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold">Activate Wallet</h2>
            <p className="text-gray-500 mt-1">
              Setup withdrawal settings to access your earnings
            </p>

            {/* Tabs */}
            <div className="flex gap-10 mt-6 border-b">
              {["withdrawal", "pin"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-2 transition ${
                    activeTab === tab
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab === "withdrawal"
                    ? "Setup Withdrawal Method"
                    : "PIN Setup"}
                </button>
              ))}
            </div>

            {activeTab === "pin" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <div>
                  <label className="block mb-2 font-medium text-gray-500">
                    Enter PIN
                  </label>
                  {renderPinRow(pin, setPin, pinRefs)}
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-500">
                    Confirm PIN
                  </label>
                  {renderPinRow(confirmPin, setConfirmPin, confirmRefs)}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
              </motion.div>
            )}

            <div className="flex justify-end mt-10">
              <button
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`px-6 py-2 rounded-full transition
              ${
                isComplete
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
              >
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showOtp && <OTPVerification show={showOtp} setShow={setShowOtp} />}
    </>
  );
}
