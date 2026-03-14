import "../../styles/ui-image.css";
import React, { useState } from "react";

interface UIImageProps {
  src: string;
  title?: string;
  alt?: string;
  isHoverEffect?: boolean;
  isSplash?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const UIImage: React.FC<UIImageProps> = ({
  src,
  title,
  alt = "image",
  isHoverEffect = false,
  isSplash = false,
  className = "",
  style = {},
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSplash) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      title={title}
      onClick={handleClick}
      style={style}
      className={`
        relative
        overflow-hidden
        rounded-md
        cursor-pointer
        ${className}
      `}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`
          w-full
          h-full
          object-cover
          ${isHoverEffect ? "transition duration-300 hover:scale-110" : ""}
        `}
      />

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
          className="
            absolute
            rounded-full
            bg-white/40
            animate-ripple
            pointer-events-none
          "
        />
      ))}
    </div>
  );
};

export default UIImage;
