import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface UISnackBarProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

const UISnackBar: React.FC<UISnackBarProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const iconMap = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div
      className="
      fixed bottom-6 right-6
      z-50
      flex items-center gap-3
      px-4 py-3
      rounded-lg
      shadow-lg
      bg-base-200
      text-base-content
      animate-fadeIn
      "
    >
      {iconMap[type]}
      <span>{message}</span>
    </div>
  );
};

export default UISnackBar;