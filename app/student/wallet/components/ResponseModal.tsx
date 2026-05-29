"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

interface ResponseModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  type?: "success" | "error";
  message?: string;
  buttonText?: string;
  onConfirm?: () => void;
}

function ResponseModal({
  show,
  setShow,
  type = "success",
  message = "Operation completed successfully",
  buttonText = "Okay",
  onConfirm,
}: ResponseModalProps) {
  const isSuccess = type === "success";

  const handleClose = () => {
    setShow(false);
    if (onConfirm) onConfirm();
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-[500px] rounded-2xl bg-white p-8 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                  isSuccess ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle className="text-green-600" size={32} />
                ) : (
                  <XCircle className="text-red-600" size={32} />
                )}
              </div>

              {/* Message */}
              <p className="mb-6 text-lg font-medium text-gray-700">
                {message}
              </p>

              {/* Button */}
              <button
                onClick={handleClose}
                className={`rounded-full px-6 py-2 text-sm font-medium text-white transition ${
                  isSuccess
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {buttonText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ResponseModal;
