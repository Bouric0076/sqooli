interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-5 py-2 rounded-full"
    >
      {children}
    </button>
  );
}
