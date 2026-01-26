"use client";

import { X } from "lucide-react";

interface MyModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function MyModal({
  open,
  onClose,
  title,
  description,
  children,
}: MyModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          sm:max-w-lg
          bg-white
          rounded-t-2xl sm:rounded-2xl
          shadow-xl
          p-4 sm:p-6
          max-h-[90vh]
          overflow-y-auto
          animate-in
          slide-in-from-bottom sm:zoom-in
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="pr-6">
            <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
            {description && (
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-gray-600
              transition
              shrink-0
            "
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="pb-safe">{children}</div>
      </div>
    </div>
  );
}
