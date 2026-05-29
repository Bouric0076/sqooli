interface FormFieldProps {
  className?:string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ className ="text-xs text-gray-500" ,label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className={className}>{label}</label>

      <div className="mt-2">{children}</div>

      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
