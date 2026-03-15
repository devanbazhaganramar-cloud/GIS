import React from "react";

interface LoaderProps {
  message?: string;
  className?: string;
}

const UIComponentLoader: React.FC<LoaderProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] transition-opacity ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 rounded-full"></div>

        <div className="absolute w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {message && (
        <p className="mt-3 text-sm font-medium text-blue-900 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default UIComponentLoader;
