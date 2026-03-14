import React from "react";

interface UISkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  className?: string;
}

const UISkeleton: React.FC<UISkeletonProps> = ({
  width = "100%",
  height = "20px",
  rounded = true,
  className = "",
}) => {
  return (
    <div
      style={{ width, height }}
      className={`
        animate-pulse
        bg-base-300
        ${rounded ? "rounded-md" : ""}
        ${className}
      `}
    />
  );
};

export default UISkeleton;