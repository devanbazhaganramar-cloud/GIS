import { Feature, Map } from "ol";
import { Geometry } from "ol/geom";
import { Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import type VectorSource from "ol/source/Vector";
import { getDynamicStyle } from "./useDynamicLayerStyle";
import { useDynamicId } from "./useDynamicId";

interface addFeatureProps {
  id?: string | null;
  name?: string | null;
  layerId: string;
  geometry: Geometry;
  style?: Style | null;
  properties?: Record<string, any> | null;
  sourceProjection?: string;
}

interface featureActionProps {
  map: Map;
  featureId: string;
}

interface toggleFeatureVisibilityProps extends featureActionProps {
  opacity: number;
}

interface zoomToFeatureProps extends featureActionProps {
  padding?: number[];
  maxZoom?: number;
  duration?: number;
}

const useAddOlFeature = ({
  id = null,
  name = null,
  layerId,
  geometry,
  style = null,
  properties = null,
  sourceProjection = "EPSG:4326",
}: addFeatureProps): Feature<Geometry> => {
  const transformedGeometry = geometry.clone();
  transformedGeometry.transform(sourceProjection, "EPSG:3857");

  const feature = new Feature({
    geometry: transformedGeometry,
  });

  // Apply visual styling
  feature.setStyle(style ? style : getDynamicStyle({}));

  // Unique ID generation: layerId#uniqueString
  const featureId = id ? id : `${layerId}#${useDynamicId(12)}`;
  const featureName = name ? name : featureId;

  feature.setId(featureId);
  feature.set("name", featureName);
  feature.set("layerId", layerId);

  if (properties && Object.keys(properties).length > 0) {
    feature.setProperties(properties);
  }

  return feature;
};

const useRemoveOlFeature = ({
  map,
  featureId,
}: featureActionProps): boolean => {
  const layerId = featureId.split("#")[0];
  if (!layerId) return false;

  const layers = map.getLayers().getArray();
  const targetLayer = layers.find(
    (layer) => layer instanceof VectorLayer && layer.get("id") === layerId,
  ) as VectorLayer<VectorSource<Feature<Geometry>>>;

  if (targetLayer) {
    const source = targetLayer.getSource();
    const feature = source?.getFeatureById(featureId);

    if (feature && source) {
      source.removeFeature(feature as Feature<Geometry>);
      return true;
    }
  }

  return false;
};

const useToggleOlFeatureVisibility = ({
  map,
  featureId,
  opacity,
}: toggleFeatureVisibilityProps): boolean => {
  const layerId = featureId.split("#")[0];
  if (!layerId) return false;

  const layers = map.getLayers().getArray();
  const targetLayer = layers.find(
    (l) => l instanceof VectorLayer && l.get("id") === layerId,
  ) as VectorLayer<VectorSource<Feature>>;

  if (targetLayer) {
    const source = targetLayer.getSource();
    const feature = source?.getFeatureById(featureId);

    if (feature) {
      opacity === 0
        ? feature.setStyle(new Style({}))
        : feature.setStyle(getDynamicStyle({}));
      return true;
    }
  }

  return false;
};

const useZoomToOlFeature = ({
  map,
  featureId,
  padding = [100, 100, 100, 100],
  maxZoom = 18,
  duration = 1000,
}: zoomToFeatureProps): boolean => {
  if (!map || !featureId) return false;

  const layerId = featureId.split("#")[0];
  const layers = map.getLayers().getArray();

  const targetLayer = layers.find(
    (layer) => layer instanceof VectorLayer && layer.get("id") === layerId,
  ) as VectorLayer<VectorSource<Feature<Geometry>>>;

  if (targetLayer) {
    const source = targetLayer.getSource();
    const feature = source?.getFeatureById(featureId);

    if (feature) {
      const geometry = feature.getGeometry();
      if (geometry) {
        const extent = geometry.getExtent();

        map.getView().fit(extent, {
          padding,
          duration,
          maxZoom,

          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });

        return true;
      }
    }
  }

  return false;
};

export {
  useAddOlFeature,
  useRemoveOlFeature,
  useToggleOlFeatureVisibility,
  useZoomToOlFeature,
};
