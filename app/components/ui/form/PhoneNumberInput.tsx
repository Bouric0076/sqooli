"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { FormField } from "@/app/components/ui/form/FormField";

interface PhoneNumberInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  required?: string;
  defaultCountry?: string;
}

export function PhoneNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  required,
  defaultCountry = "ke",
}: PhoneNumberInputProps<T>) {
  return (
    <FormField label={label} error={error}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required } : undefined}
        render={({ field }) => (
          <div className="w-full rounded-full border border-gray-200 px-4 py-[2px] text-sm focus-within:ring-1 focus-within:ring-indigo-500">
            <PhoneInput
              country={defaultCountry}
              value={field.value}
              onChange={(phone) => field.onChange("+" + phone)}
              inputStyle={{
                border: "none",
                width: "100%",
                background: "transparent",
              }}
              buttonStyle={{
                border: "none",
                background: "transparent",
              }}
            />
          </div>
        )}
      />
    </FormField>
  );
}
