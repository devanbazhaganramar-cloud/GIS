import React, { useState, useMemo } from "react";
import Map from "ol/Map";
import { Globe, Moon, LayersIcon } from "lucide-react";
import { useSelector } from "react-redux";

interface BasemapToggleProps {
  mapName: string;
}

const BasemapToggle: React.FC<BasemapToggleProps> = ({ mapName }) => {
  const { olMapList } = useSelector((state: any) => state.mapService);
  const [active, setActive] = useState("base-light");

  const map = useMemo(() => {
    return olMapList?.find((m: Map) => m.get("name") === mapName);
  }, [olMapList, mapName]);

  const basemaps = [
    { id: "base-light", label: "Street", icon: <LayersIcon size={14} /> },
    { id: "base-satellite", label: "Satellite", icon: <Globe size={14} /> },
    { id: "base-dark", label: "Dark", icon: <Moon size={14} /> },
  ];

  const toggle = (id: string) => {
    if (!map) return;

    setActive(id);

    map
      .getLayers()
      .getArray()
      .forEach((layer: any) => {
        if (layer.get("type") === "basemap") {
          layer.setVisible(layer.get("id") === id);
        }
      });
  };

  return (
    <div className="flex flex-col gap-1 text-[11px]">
      <div className="text-[10px] font-semibold opacity-60 mb-1">Basemap</div>

      {basemaps.map((b) => (
        <button
          key={b.id}
          onClick={() => toggle(b.id)}
          className={`flex items-center gap-2 px-2 py-1 rounded text-left
          ${
            active === b.id ? "bg-primary/10 text-primary" : "hover:bg-base-200"
          }`}
        >
          {b.icon}
          <span>{b.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BasemapToggle;
