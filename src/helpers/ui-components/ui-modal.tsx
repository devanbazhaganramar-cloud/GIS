import React from "react";
import { X } from "lucide-react";
import UIButton from "./ui-button";

interface UIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const UIModal: React.FC<UIModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
  style = {},
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        style={style}
        className={`
          relative
          
          text-base-content
          rounded-xl
          shadow-xl
          w-[90%] md:w-600px
          max-h-[90vh]
          flex flex-col
          ${className}
        `}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-base-300">
          <div className="text-lg font-semibold">{title}</div>

          <UIButton
            prefix={<X size={18} />}
            onClick={onClose}
            className="bg-base-200 hover:bg-base-300"
          />
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>

        {footer && (
          <div className="px-6 py-4 border-t border-base-300 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default UIModal;
