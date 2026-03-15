import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style } from "ol/style";
import { Feature, Map } from "ol";
import { Geometry } from "ol/geom";
import { getDynamicStyle } from "./useDynamicLayerStyle";
import { useDynamicId } from "./useDynamicId";

interface addVectorlayerProps {
  id?: string;
  name: string;
  properties?: Record<string, any> | null;
  source?: VectorSource<Feature<Geometry>> | null;
  style?: Style | null;
}

interface layerActionProps {
  map: Map;
  layerId: string;
}

interface toggleVisibilityProps extends layerActionProps {
  visibility?: boolean | null;
}

const useAddOlVectorLayer = ({
  id,
  name,
  properties = null,
  source = null,
  style = null,
}: addVectorlayerProps): VectorLayer<VectorSource<Feature<Geometry>>> => {
  const vectorSource = source ? source : new VectorSource();

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: style ? style : getDynamicStyle({}),
  });

  const layerId = id ? id : useDynamicId(12);
  const layerName = name || "New Vector Layer";

  vectorLayer.set("id", layerId);
  vectorLayer.set("name", layerName);

  if (properties) {
    vectorLayer.setProperties(properties);
  }

  return vectorLayer;
};

const useRemoveOlVectorLayer = ({
  map,
  layerId,
}: layerActionProps): boolean => {
  if (!map) return false;

  const layers = map.getLayers().getArray();
  const layerToRemove = layers.find((layer) => layer.get("id") === layerId);

  if (layerToRemove) {
    map.removeLayer(layerToRemove);
    return true;
  }

  console.warn(`[GIS Engine] Layer removal failed: ${layerId} not found.`);
  return false;
};

const useToggleOlVectorLayerVisibility = ({
  map,
  layerId,
  visibility = null,
}: toggleVisibilityProps): boolean => {
  if (!map) return false;

  const layers = map.getLayers().getArray();
  const targetLayer = layers.find((layer) => layer.get("id") === layerId);

  if (targetLayer) {
    const nextVisibility =
      visibility !== null ? visibility : !targetLayer.getVisible();

    targetLayer.setVisible(nextVisibility);
    return true;
  }

  return false;
};

const useGetVectorLayer = ({
  map,
  layerId,
}: layerActionProps): VectorLayer<VectorSource<Feature<Geometry>>> | null => {
  if (!map || !(map instanceof Map)) return null;

  const layerList = map.getLayers().getArray();

  const target = layerList.find(
    (lyr) => lyr.get("id") === layerId,
  ) as VectorLayer<VectorSource<Feature<Geometry>>>;

  return target || null;
};

export {
  useAddOlVectorLayer,
  useRemoveOlVectorLayer,
  useToggleOlVectorLayerVisibility,
  useGetVectorLayer,
};
