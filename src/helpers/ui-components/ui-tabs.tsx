import React, { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface UITabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

const UITabs: React.FC<UITabsProps> = ({
  tabs,
  defaultIndex = 0,
  className = "",
}) => {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className={`w-full ${className}`}>

      {/* tab headers */}
      <div className="flex border-b border-base-300">

        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`
              px-4 py-2
              text-sm
              transition
              ${
                active === i
                  ? "border-b-2 border-primary text-primary"
                  : "text-base-content/70 hover:text-base-content"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* tab body */}
      <div className="py-4">{tabs[active].content}</div>
    </div>
  );
};

export default UITabs;