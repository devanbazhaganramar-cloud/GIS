import React, { Fragment, useState } from "react";
import UIButton from "./ui-button";
import { Menu, X } from "lucide-react"; // Changed icon to Menu for better UX
import UIText from "./ui-text";
import ThemeToggle from "../../components/app-theme";

interface UISidebarProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  title?: string;
}

const UISidebar: React.FC<UISidebarProps> = ({
  header,
  body,
  footer,
  defaultOpen = false,
  className = "",
  style = {},
  width = "w-64",
  title = "",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <Fragment>
      <div
        style={style}
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          ${width} bg-base-100 border-r border-base-300 flex flex-col shadow-xl ${className}`}
      >
        <div className="flex justify-between items-center p-2">
          <UIText type="paragraph" className="w-[70%]">
            {title}
          </UIText>
          <div className="flex gap-1 w-[30%]">
            <ThemeToggle />
            <UIButton
              prefix={<X size={20} />}
              onClick={() => setIsOpen(false)}
              className="btn-ghost btn-sm bg-transparent"
            />
          </div>
        </div>

        {header && <div className="p-4 border-b border-base-200">{header}</div>}
        <div className="grow overflow-y-auto p-4">{body}</div>
        {footer && <div className="p-4 border-t border-base-200">{footer}</div>}
      </div>

      {!isOpen && (
        <UIButton
          prefix={<Menu size={20} />}
          className="fixed top-4 left-4 z-40 shadow-md"
          onClick={() => setIsOpen(true)}
        />
      )}
    </Fragment>
  );
};

export default UISidebar;
