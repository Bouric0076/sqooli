import React from "react";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus-within:ring-1 focus-within:ring-blue-400"
    />
  );
});

TextInput.displayName = "TextInput";
