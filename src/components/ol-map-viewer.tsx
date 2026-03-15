import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createOLMap } from "../helpers/hooks/useOlMap";
import { DragAndDrop } from "ol/interaction";
import { GeoJSON } from "ol/format";
import VectorSource from "ol/source/Vector";
import type { View } from "ol";
import UIComponentLoader from "../helpers/ui-components/ui-component-loader";
import MapControlWrapper from "./map-control-wrapper";
import { HomeWidget, ZoomInWidget, ZoomOutWidget } from "./map-controls";
import { LocationWidget } from "./geoLocation";
import { LayerListToggle } from "./ol-layer-switcher";
import { useAddOlVectorLayer } from "../helpers/hooks/useOlVectorLayer";
import { useDynamicId } from "../helpers/hooks/useDynamicId";
import { useAddOlFeature } from "../helpers/hooks/useOlFeature";
import type { Geometry } from "ol/geom";

interface olMapViewerProps {
  mapName: string;
  mapView?: View;
  mapCenter?: [number, number];
  mapZoom?: number;
  enableDragAndDrop?: boolean;
}

const OlMapViewer: React.FC<olMapViewerProps> = ({
  mapName,
  mapZoom,
  mapCenter,
  mapView,
  enableDragAndDrop = false,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapObj, setMapObj] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mapElement.current && !mapObj) {
      const map = createOLMap({
        name: mapName,
        zoom: mapZoom,
        center: mapCenter,
        view: mapView,
      });

      map.setTarget(mapElement.current);
      setMapObj(map);

      dispatch({
        type: "mapService/setOlMapList",
        payload: map,
      });
    }

    return () => {
      if (mapObj) {
        const name = mapObj.get("name");
        dispatch({ type: "mapService/removeMapFromList", payload: name });
        mapObj.setTarget(undefined);
      }
    };
  }, [mapObj, dispatch, mapName, mapZoom, mapCenter, mapView]);

  useEffect(() => {
    if (!mapObj || !enableDragAndDrop) return;

    const dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [GeoJSON],
    });

    dragAndDropInteraction.on("addfeatures", (event: any) => {
      const vectorSource = new VectorSource({});

      const vectorLayer = useAddOlVectorLayer({
        id: useDynamicId(8),
        name: event.file.name,
        source: vectorSource,
      });
      if (!event.features) return;
      const processedFeatures = event.features.map((rawFeature: any) => {
        const props = rawFeature.getProperties();

        return useAddOlFeature({
          name: `${props.type}-${props.status}`,
          layerId: vectorLayer.get("id"),
          geometry: rawFeature.getGeometry() as Geometry,
          properties: props,
        });
      });

      vectorSource.addFeatures(processedFeatures);

      mapObj.addLayer(vectorLayer);

      const extent = vectorSource.getExtent();
      if (extent && extent.every(isFinite)) {
        mapObj
          .getView()
          .fit(extent, { duration: 600, padding: [50, 50, 50, 50] });
      }
    });

    mapObj.addInteraction(dragAndDropInteraction);
    return () => {
      mapObj.removeInteraction(dragAndDropInteraction);
    };
  }, [mapObj, enableDragAndDrop]);

  useEffect(() => {
    if (!mapObj) return;

    const startLoad = () => setIsLoading(true);
    const endLoad = () => setIsLoading(false);

    mapObj.on(["loadstart", "movestart"], startLoad);
    mapObj.on(["loadend", "moveend"], endLoad);

    const attachSourceListeners = () => {
      mapObj.getLayers().forEach((layer: any) => {
        const source = layer.getSource();
        if (source && !source.get("hasLoaderListener")) {
          source.on("featuresloadstart", startLoad);
          source.on(["featuresloadend", "featuresloaderror"], endLoad);
          source.set("hasLoaderListener", true);
        }
      });
    };

    attachSourceListeners();
    mapObj.getLayers().on("add", attachSourceListeners);

    return () => {
      mapObj.un(["loadstart", "movestart"], startLoad);
      mapObj.un(["loadend", "moveend"], endLoad);
      mapObj.getLayers().un("add", attachSourceListeners);
    };
  }, [mapObj]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={mapElement} className="h-full w-full" />

      {isLoading && (
        <div className="absolute inset-0 z-200 flex items-center justify-center bg-base-100/10 backdrop-blur-[2px] pointer-events-none">
          <UIComponentLoader />
        </div>
      )}

      {mapObj && (
        <MapControlWrapper>
          <ZoomInWidget map={mapObj} />
          <ZoomOutWidget map={mapObj} />
          <div className="my-1 border-t border-base-300 opacity-20" />
          <HomeWidget map={mapObj} center={mapCenter} zoom={mapZoom} />
          <LocationWidget map={mapObj} />
          <LayerListToggle map={mapObj} />
        </MapControlWrapper>
      )}
    </div>
  );
};

export default OlMapViewer;
