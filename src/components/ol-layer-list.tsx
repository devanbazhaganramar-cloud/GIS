import React, { useEffect, useState, useMemo } from "react";
import {
  Layers,
  Map as MapIcon,
  Eye,
  EyeOff,
  Maximize2,
  ChevronDown,
  ChevronRight,
  MapPin,
} from "lucide-react";
import UIButton from "../helpers/ui-components/ui-button";

interface LayerListProps {
  map: any;
}

const LayerListWidget: React.FC<LayerListProps> = ({ map }) => {
  const [layers, setLayers] = useState<any[]>([]);
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>(
    {},
  );
  const [showFeatures, setShowFeatures] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!map || typeof map.getLayers !== "function") return;

    const updateLayers = () => {
      try {
        const layerGroup = map.getLayers();
        if (layerGroup) {
          setLayers([...layerGroup.getArray()]);
        }
      } catch (err) {
        console.error("Error fetching layers:", err);
      }
    };

    map.getLayers().on(["add", "remove"], updateLayers);
    updateLayers();

    return () => {
      if (map.getLayers()) {
        map.getLayers().un(["add", "remove"], updateLayers);
      }
    };
  }, [map]);

  const { basemaps, vectorLayers } = useMemo(() => {
    return {
      basemaps: layers.filter((l) => l?.get && l.get("type") === "basemap"),
      vectorLayers: layers.filter((l) => l?.get && l.get("type") !== "basemap"),
    };
  }, [layers]);

  const handleBasemapToggle = (selectedLayer: any) => {
    basemaps.forEach((layer) => {
      layer.setVisible(layer === selectedLayer);
    });
    setLayers([...map.getLayers().getArray()]);
  };

  const toggleVisibility = (layer: any) => {
    if (!layer || typeof layer.setVisible !== "function") return;
    layer.setVisible(!layer.getVisible());
    setLayers([...map.getLayers().getArray()]);
  };

  const zoomToLayer = (target: any, isFeature: boolean = false) => {
    if (!target || !map) return;
    try {
      const extent = isFeature
        ? target.getGeometry().getExtent()
        : target.getSource().getExtent();

      if (extent && extent.every(isFinite)) {
        map.getView().fit(extent, {
          duration: 600,
          padding: [50, 50, 50, 50],
        });
      }
    } catch (err) {
      console.error("Zoom failed:", err);
    }
  };

  return (
    <div className="w-72 h-full max-h-[85vh] bg-base-100 shadow-2xl rounded-xl border border-base-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="p-3 border-b border-base-200 flex items-center justify-between bg-base-200/50 shrink-0">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-base-content/80">
            Layer List
          </span>
        </div>
      </div>

      <div className="overflow-y-auto p-2 grow custom-scrollbar space-y-4">
        {vectorLayers.length > 0 ? (
          <div>
            <div className="text-[10px] font-black opacity-40 px-2 mb-1 flex items-center gap-1 uppercase tracking-tighter">
              <Layers size={12} /> Operational Layers
            </div>
            {vectorLayers.map((layer, idx) => {
              const name = layer.get?.("name") || "Unnamed Layer";
              return (
                <LayerItem
                  key={`vec-${idx}`}
                  layer={layer}
                  onToggle={toggleVisibility}
                  onZoom={() => zoomToLayer(layer)}
                  onZoomFeature={(feat: any) => zoomToLayer(feat, true)}
                  isExpanded={!!expandedLayers[name]}
                  onExpand={() =>
                    setExpandedLayers((p) => ({ ...p, [name]: !p[name] }))
                  }
                  showFeatures={!!showFeatures[name]}
                  onToggleFeatures={() =>
                    setShowFeatures((p) => ({ ...p, [name]: !p[name] }))
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-center opacity-30 text-xs italic">
            No operational layers
          </div>
        )}

        {basemaps.length > 0 && (
          <div className="pt-2 border-t border-base-200">
            <div className="text-[10px] font-black opacity-40 px-2 mb-1 flex items-center gap-1 uppercase tracking-tighter">
              <MapIcon size={12} /> Basemaps
            </div>
            {basemaps.map((layer, idx) => (
              <LayerItem
                key={`base-${idx}`}
                layer={layer}
                onToggle={handleBasemapToggle}
                isBasemap
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LayerItem = ({
  layer,
  onToggle,
  onZoom,
  onZoomFeature,
  isBasemap,
  isExpanded,
  onExpand,
}: any) => {
  const name = layer?.get
    ? layer.get("name") || "Unnamed Layer"
    : "Unknown Layer";
  const isVisible = layer?.getVisible ? layer.getVisible() : false;
  const source = layer?.getSource?.();
  const hasError = !layer || !source;

  // LOGIC: Extract features from the source
  const features = useMemo(() => {
    if (!source || typeof source.getFeatures !== "function") return [];
    return source.getFeatures();
  }, [source, isExpanded]); // Re-evaluate when expanded

  return (
    <div
      className={`flex flex-col mb-1 rounded-lg transition-all ${hasError ? "bg-error/5" : ""}`}
    >
      <div className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg group transition-all">
        <div
          className="flex items-center gap-2 grow cursor-pointer overflow-hidden"
          onClick={isBasemap ? () => onToggle(layer) : onExpand}
        >
          {isBasemap ? (
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isVisible ? "border-primary bg-primary" : "border-base-content/30"}`}
            >
              {isVisible && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
          ) : (
            <div className="opacity-40">
              {isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>
          )}
          <span
            className={`text-sm truncate select-none ${isVisible ? "text-base-content font-medium" : "opacity-40"}`}
          >
            {name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {!isBasemap && isVisible && !hasError && (
            <UIButton
              prefix={<Maximize2 size={12} />}
              className="btn-ghost btn-xs h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e: any) => {
                e.stopPropagation();
                onZoom();
              }}
            />
          )}
          {!isBasemap && (
            <UIButton
              prefix={
                isVisible ? (
                  <Eye size={14} />
                ) : (
                  <EyeOff size={14} className="text-error" />
                )
              }
              className="btn-ghost btn-xs h-7 w-7"
              onClick={(e: any) => {
                e.stopPropagation();
                onToggle(layer);
              }}
            />
          )}
        </div>
      </div>

      {isExpanded && !hasError && !isBasemap && (
        <div className="ml-6 border-l-2 border-base-300 pl-2 mb-2 space-y-1 animate-in slide-in-from-top-1">
          {features.length > 0 ? (
            features.map((feature: any, i: number) => {
              const featureName =
                feature.get("name") ||
                feature.get("id") ||
                feature.getId() ||
                `Feature ${i + 1}`;

              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-1 hover:bg-base-200 rounded group/feat transition-colors"
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <MapPin size={10} className="text-primary/60 shrink-0" />
                    <span className="text-[11px] truncate opacity-70 group-hover/feat:opacity-100">
                      {featureName}
                    </span>
                  </div>
                  <UIButton
                    prefix={<Maximize2 size={10} />}
                    className="btn-ghost h-5 w-5 opacity-0 group-hover/feat:opacity-100"
                    onClick={() => onZoomFeature(feature)}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-[11px] opacity-50 py-1 italic">
              No features available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LayerListWidget;
