import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createOLMap } from "../helpers/hooks/useOlMap";
import type { View } from "ol";
import UIComponentLoader from "../helpers/ui-components/ui-component-loader";

interface olMapViewerProps {
  mapName: string;
  mapView?: View;
  mapCenter?: [number, number];
  mapZoom?: number;
}

const OlMapViewer: React.FC<olMapViewerProps> = ({
  mapName,
  mapZoom,
  mapCenter,
  mapView,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mapElement.current && !mapInstance.current) {
      setIsLoading(true);
      const map = createOLMap({
        name: mapName,
        zoom: mapZoom ?? mapZoom,
        center: mapCenter ?? mapCenter,
        view: mapView ?? mapView,
      });

      map.setTarget(mapElement.current);
      mapInstance.current = map;

      dispatch({
        type: "mapService/setOlMapList",
        payload: map,
      });
      setIsLoading(false);
    }

    return () => {
      if (mapInstance.current) {
        const map = mapInstance.current;
        const name = map.get("name");

        dispatch({
          type: "mapService/removeMapFromList",
          payload: name,
        });

        map.setTarget(undefined);
        mapInstance.current = null;
        setIsLoading(false);
      }
    };
  }, [dispatch]);

  return (
    <div ref={mapElement} className="h-full w-full">
      {isLoading && <UIComponentLoader />}
    </div>
  );
};

export default OlMapViewer;
