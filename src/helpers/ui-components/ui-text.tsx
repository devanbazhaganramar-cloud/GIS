import React, { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";

interface UITextProps {
  children: string;
  type?: "header" | "subheader" | "paragraph";
  expand?: boolean;
  isCopy?: boolean;
  isAnimation?: boolean;
  className?: string;
}

const UIText: React.FC<UITextProps> = ({
  children,
  type = "paragraph",
  expand = false,
  isCopy = false,
  isAnimation = false,
  className = "",
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(expand);
  const [overflow, setOverflow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = textRef.current;

    if (el) {
      setOverflow(el.scrollWidth > el.clientWidth);
    }
  }, [children]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const typeStyles = {
    header: "text-3xl md:text-5xl font-bold",
    subheader: "text-lg md:text-xl font-semibold",
    paragraph: "text-sm md:text-base text-base-content/80",
  };

  return (
    <div className={`relative ${className}`}>

      <div
        ref={textRef}
        onClick={() => overflow && setExpanded(!expanded)}
        className={`
          ${typeStyles[type]}
          ${!expanded ? "truncate cursor-pointer" : ""}
          ${isAnimation ? "transition-all duration-300" : ""}
        `}
      >
        {children}
      </div>

      {/* Copy Button */}
      {isCopy && (
        <button
          onClick={handleCopy}
          className="absolute top-0 right-0 text-base-content/50 hover:text-base-content"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}

    </div>
  );
};

export default UIText;