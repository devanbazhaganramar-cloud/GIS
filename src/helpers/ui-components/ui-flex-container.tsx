import React from "react";

interface UIContainerProps {
  children?: React.ReactNode;
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "between" | "around";
  align?: "start" | "center" | "end" | "stretch";
  wrap?: boolean;
  gap?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const UIContainer: React.FC<UIContainerProps> = ({
  children,
  direction = "row",
  justify = "start",
  align = "center",
  wrap = true,
  gap = "md",
  fullWidth = true,
  fullHeight = false,
  className = "",
  style = {},
}) => {
  const directionMap = {
    row: "flex-row",
    column: "flex-col",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const gapMap = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      style={style}
      className={`
        flex
        ${directionMap[direction]}
        ${justifyMap[justify]}
        ${alignMap[align]}
        ${wrap ? "flex-wrap" : ""}
        ${gapMap[gap]}
        
        ${fullWidth ? "w-full" : ""}
        ${fullHeight ? "h-full" : ""}

        px-2 sm:px-2 md:px-2 lg:px-2
        py-2

        bg-base-100
        text-base-content

        transition-colors duration-300

        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default UIContainer;
