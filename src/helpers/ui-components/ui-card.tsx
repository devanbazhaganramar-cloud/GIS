import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type CardSize = "small" | "medium" | "large";

interface CardProps {
  className?: string;
  style?: React.CSSProperties;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  isDisabled?: boolean;
  shadow?: boolean;
  size?: CardSize;
  expand?: boolean;
  onClick?: () => void;
}

const UICard: React.FC<CardProps> = ({
  className = "",
  style,
  header,
  body,
  footer,
  isDisabled = false,
  shadow = true,
  size = "medium",
  expand = false,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeMap = {
    small: "p-3 text-sm",
    medium: "p-4 text-base",
    large: "p-6 text-lg",
  };

  const shadowClass = shadow ? "shadow-md hover:shadow-xl" : "";

  return (
    <div
      style={style}
      className={`
        bg-base-100 border border-base-300 rounded-xl
        transition-all duration-300 ease-in-out
        ${shadowClass}
        ${sizeMap[size]}
        ${isDisabled ? "opacity-50 pointer-events-none" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {header && (
        <div
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="font-semibold">{header}</div>

          {expand && (
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      )}

      <div
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {body}
      </div>

      {footer && isOpen && (
        <div className="mt-4 pt-3 border-t border-base-300">{footer}</div>
      )}
    </div>
  );
};

export default UICard;
