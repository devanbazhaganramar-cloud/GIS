import React from "react";

interface ButtonProps {
  prefix?: React.ReactNode;
  mid?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  title?: string;
  id?: string;
}

const UIButton: React.FC<ButtonProps> = ({
  prefix,
  mid,
  suffix,
  onClick,
  isLoading = false,
  isDisabled = false,
  className = "",
  style = {},
  type = "button",
  title,
  id,
}) => {
  const disabled = isDisabled || isLoading;

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      title={title}
      className={`
        
        inline-flex items-center justify-center gap-2
        cursor-pointer
        px-2 py-2
        rounded-lg
        bg-base-200
        text-base-content
        hover:bg-base-300
        active:scale-[0.97]
        focus:outline-none
        focus:ring-2
        focus:ring-base-content/20
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        border-0
        ${className}
      `}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}

      {!isLoading && prefix && (
        <span className="flex items-center">{prefix}</span>
      )}

      {mid && <span className="whitespace-nowrap">{mid}</span>}

      {!isLoading && suffix && (
        <span className="flex items-center">{suffix}</span>
      )}
    </button>
  );
};

export default UIButton;
