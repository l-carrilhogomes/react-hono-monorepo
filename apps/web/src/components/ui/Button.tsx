import type { JSX, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, disabled, type = "submit", ...props }: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`p-2 bg-gray-700 text-white font-medium w-75 rounded cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      {...props}
    >
      {label}
    </button>
  );
}

