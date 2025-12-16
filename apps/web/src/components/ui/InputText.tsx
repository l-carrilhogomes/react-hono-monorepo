import { forwardRef, type JSX, type InputHTMLAttributes } from "react";

interface InputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  type?: "text" | "password" | "email";
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, type = "text", ...props }, ref): JSX.Element => {
    return (
      <div className="flex flex-col">
        {label && <label>{label}</label>}
        <input
          ref={ref}
          type={type}
          className="border p-2 rounded w-75"
          {...props}
        />
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;

