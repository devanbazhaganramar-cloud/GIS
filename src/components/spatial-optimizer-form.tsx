import React, { useState } from "react";
import { FileCode } from "lucide-react";
import UIFileUpload from "../helpers/ui-components/ui-file-upload";
import UIButton from "../helpers/ui-components/ui-button";

const SpatialSettingsForm: React.FC = () => {
  // 1. Form State
  const [formData, setFormData] = useState({
    projectName: "",
    demFile: null as File | null,
    maskFile: null as File | null,
    isPublic: false,
    optimizationType: "standard",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.projectName)
      newErrors.projectName = "Project name is required";
    if (!formData.demFile) newErrors.demFile = "Please upload a terrain model";
    if (!formData.maskFile) newErrors.demFile = "Please upload a mask layers";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Processing Spatial Data:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 h-full">
      <UIFileUpload
        label="Elevation Model (DEM)"
        accept=".tif,.geotif"
        fileName={formData.demFile?.name}
        onChange={(file: any) => setFormData({ ...formData, demFile: file })}
        error={errors.demFile}
      />

      <UIFileUpload
        label="Boundary Layer"
        accept=".geojson"
        fileName={formData.maskFile?.name}
        suffix={<FileCode size={18} />}
        error={errors.maskFile}
        onChange={(file: any) => setFormData({ ...formData, maskFile: file })}
      />

      <div className="mt-6 pt-6 border-t border-base-200">
        <UIButton
          title="Start Optimization"
          className="w-full btn-primary rounded-lg"
          type="submit"
          mid="Start Optimization"
        />
      </div>
    </form>
  );
};

export default SpatialSettingsForm;
