import React from "react";

interface UIInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  suffix?: React.ReactNode;
  error?: string;
}

const UIInput: React.FC<UIInputProps> = ({
  label,
  suffix,
  error,
  ...props
}) => (
  <div className="form-control w-full mb-4">
    {label && (
      <label className="label text-xs font-bold uppercase opacity-60">
        {label}
      </label>
    )}
    <div className="relative flex items-center">
      <input
        {...props}
        className={`input input-bordered w-full pr-10 focus:outline-primary ${error ? "border-error" : "border-base-300"}`}
      />
      {suffix && <div className="absolute right-3 opacity-40">{suffix}</div>}
    </div>
    {error && <span className="text-[10px] text-error mt-1">{error}</span>}
  </div>
);

export default UIInput;
