import { useState } from "react";
import UIButton from "../helpers/ui-components/ui-button";
import { Layers, X } from "lucide-react";
import LayerListWidget from "./ol-layer-list";

export const LayerListToggle = ({ map }: { map: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      {" "}
      {/* Keep relative to anchor the list */}
      <UIButton
        prefix={isOpen ? <X size={18} /> : <Layers size={18} />}
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-square shadow-md ${isOpen ? "btn-primary" : "bg-base-100"}`}
      />
      {isOpen && (
        /* Position the list to the LEFT of the button stack 
           - right-12: pushes it away from the button width
           - top-0: aligns it with the button top
        */
        <div className="absolute top-0 right-12 z-50  h-[60vh] overflow-auto scroll-m-0">
          <LayerListWidget map={map} />
        </div>
      )}
    </div>
  );
};
