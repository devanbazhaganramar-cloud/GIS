import React from "react";
import { Upload } from "lucide-react";

interface UIFileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
  accept?: string;
  error?: string;
  suffix?: React.ReactNode;
  fileName?: string;
}

const UIFileUpload: React.FC<UIFileUploadProps> = ({ label, onChange, accept, error, suffix, fileName }) => (
  <div className="form-control w-full mb-4">
    <label className="label text-xs font-bold uppercase opacity-60">{label}</label>
    <label className={`
      relative flex flex-col items-center justify-center h-24 rounded-lg cursor-pointer border-2 border-dashed transition-all
      ${error ? 'border-error bg-error/5' : 'border-base-300 bg-base-200/30 hover:bg-base-200/60'}
    `}>
      <input 
        type="file" className="hidden" accept={accept} 
        onChange={(e) => onChange(e.target.files?.[0] || null)} 
      />
      <div className="flex flex-col items-center gap-1 opacity-50">
        {suffix || <Upload size={18} />}
        <span className="text-[11px] font-medium">{fileName || "Click to upload"}</span>
      </div>
    </label>
    {error && <span className="text-[10px] text-error mt-1">{error}</span>}
  </div>
);

export default UIFileUpload;