"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  value?: string;
  options?: Option[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function SelectInput({
  value,
  options = [],
  placeholder = "Select...",
  disabled = false,
  onChange,
}: SelectInputProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between rounded-full border px-4 py-2 text-sm
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300"
          }`}
      >
        <span>
          {selectedLabel || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown size={14} />
      </button>

      {/* Dropdown */}
      {open && !disabled && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-md max-h-56 overflow-auto">
          {options.length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-400">No options</li>
          )}

          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
