import { useState } from "react";
import UIButton from "../helpers/ui-components/ui-button";
import { Layers, X } from "lucide-react";
import LayerListWidget from "./ol-layer-list";

export const LayerListToggle = ({ map }: { map: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      {" "}
      <UIButton
        prefix={isOpen ? <X size={18} /> : <Layers size={18} />}
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-square shadow-md ${isOpen ? "btn-primary" : "bg-base-100"}`}
      />
      {isOpen && (
        <div className="absolute top-0 right-12 z-50  h-[60vh] overflow-auto scrollbar-thin scrollbar-track-base-200 scrollbar-thumb-primary">
          <LayerListWidget map={map} />
        </div>
      )}
    </div>
  );
};
