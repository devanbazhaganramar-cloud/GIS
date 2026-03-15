import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, Attribution, Rotate } from "ol/control";
import {
  mapBaseLayerDt,
  mapBaseLayerLt,
  mapBaseLayerSl,
} from "./useLayerProperties";

interface MapProps {
  name: string;
  view?: View;
  center?: [number, number];
  zoom?: number;
}

export const createOLMap = ({
  name,
  view,
  center,
  zoom = 14,
}: MapProps): Map => {
  let mapView: View;

  if (view) {
    mapView = view;
  } else {
    const initialCenter = center ? fromLonLat(center) : fromLonLat([0, 0]);

    mapView = new View({
      projection: "EPSG:3857",
      center: initialCenter,
      zoom: zoom,
    });

    if (!center && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          mapView.animate({
            center: fromLonLat([longitude, latitude]),
            duration: 1000,
          });
        },
        (error) => console.warn("Geolocation failed:", error.message),
      );
    }
  }

  const map = new Map({
    layers: [mapBaseLayerLt, mapBaseLayerDt, mapBaseLayerSl],

    controls: defaultControls({
      zoom: false,
      attribution: false,
      rotate: false,
    }).extend([
      new Attribution({
        collapsible: true,
      }),

      new Rotate({
        autoHide: false,
      }),
    ]),
    view: mapView,
  });

  map.set("name", name);

  return map;
};
