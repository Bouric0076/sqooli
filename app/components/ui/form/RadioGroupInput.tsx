"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "@/app/components/ui/form/FormField";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  error?: string;
  required?: string;
}

export function RadioGroupInput<T extends FieldValues>({
  control,
  name,
  label,
  options,
  error,
  required,
}: RadioGroupInputProps<T>) {
  return (
    <FormField label={label} error={error}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required } : undefined}
        render={({ field }) => (
          <div className="flex items-center gap-6">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="radio"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                {option.label}
              </label>
            ))}
          </div>
        )}
      />
    </FormField>
  );
}
