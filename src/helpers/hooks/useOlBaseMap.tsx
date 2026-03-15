import Map from "ol/Map";
import BaseLayer from "ol/layer/Base";

const useToggleBasemap = (map: Map, activeId: string): void => {
  if (!map) return;

  const layers = map.getLayers().getArray();

  layers.forEach((layer: BaseLayer) => {
    if (layer.get("type") === "basemap") {
      const layerId = layer.get("id");
      layer.setVisible(layerId === activeId);
    }
  });
};

export { useToggleBasemap };
