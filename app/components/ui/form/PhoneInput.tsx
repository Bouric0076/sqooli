"use client";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Controller, Control } from "react-hook-form";

interface PhoneFieldProps {
  control: Control<any>;
  name: string;
  error?: string;
  country?: string;
}

export function PhoneField({
  control,
  name,
  error,
  country = "ke",
}: PhoneFieldProps) {
  return (
    <div>
      <div
        className={`w-full px-4 py-1 rounded-full border border-gray-300 bg-white text-sm
        ${
          error
            ? "ring-2 ring-red-400"
            : "focus-within:ring-1 focus-within:ring-blue-400"
        }`}
      >
        <Controller
          control={control}
          name={name}
          rules={{ required: "Phone number is required" }}
          render={({ field }) => (
            <PhoneInput
              country={country}
              value={field.value}
              onChange={(phone) => field.onChange("+" + phone)}
              inputStyle={{
                border: "none",
                width: "100%",
                backgroundColor: "transparent",
              }}
              buttonStyle={{
                border: "none",
                background: "transparent",
              }}
              dropdownStyle={{
                borderRadius: "12px",
              }}
              containerStyle={{
                width: "100%",
              }}
            />
          )}
        />
      </div>

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
// import React from "react";

// interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   countryCode?: string;
//   flag?: string;
// }

// export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
//   ({ countryCode = "+254", flag = "🇰🇪", ...props }, ref) => {
//     return (
//       <div className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2">
//         <span className="text-xs flex items-center gap-1">
//           {flag} <span>{countryCode}</span>
//         </span>
//         <input
//           ref={ref}
//           {...props}
//           className="w-full text-sm focus:outline-none"
//         />
//       </div>
//     );
//   }
// );

// PhoneInput.displayName = "PhoneInput";
