import React from "react";
import { Check } from "lucide-react";

interface RadioOption {
  id: string;
  name: string;
}

interface UIRadioGroupProps {
  label?: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
}

const UIRadioGroup: React.FC<UIRadioGroupProps> = ({ label, options, selectedValue, onChange, error }) => (
  <div className="form-control mb-4">
    {label && <label className="label text-xs font-bold uppercase opacity-60">{label}</label>}
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            className="sr-only peer"
            name="custom-radio"
            checked={selectedValue === opt.id}
            onChange={() => onChange(opt.id)}
          />
          <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center
            ${selectedValue === opt.id ? 'bg-success border-success' : 'border-base-300 bg-transparent group-hover:border-success'}
            ${error ? 'border-error' : ''}`}>
            {selectedValue === opt.id && <Check size={12} className="text-white" strokeWidth={4} />}
          </div>
          <span className="text-sm">{opt.name}</span>
        </label>
      ))}
    </div>
    {error && <span className="text-[10px] text-error mt-1">{error}</span>}
  </div>
);

export default UIRadioGroup;