import React from "react";
import { Check } from "lucide-react";

interface UICheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

const UICheckbox: React.FC<UICheckboxProps> = ({ label, checked, onChange, error }) => (
  <div className="form-control mb-4">
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center
          ${checked ? 'bg-primary border-primary' : 'border-base-300 bg-transparent group-hover:border-primary'}
          ${error ? 'border-error' : ''}`}>
          {checked && <Check size={14} className="text-primary-content" strokeWidth={4} />}
        </div>
      </div>
      <span className="text-sm select-none">{label}</span>
    </label>
    {error && <span className="text-[10px] text-error mt-1">{error}</span>}
  </div>
);

export default UICheckbox;