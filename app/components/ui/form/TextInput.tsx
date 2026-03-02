import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          {...props}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-blue-400"
        />

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
