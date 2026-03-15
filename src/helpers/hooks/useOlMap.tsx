import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls, Attribution, Rotate } from "ol/control";

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
    layers: [
      new TileLayer({
        source: new OSM({
          // Set custom attribution directly on the source
          attributions: "anbazhagan - ramar, geoledger community",
        }),
        visible: true,
        properties: { title: "OpenStreetMap" },
      }),
    ],
    // Remove default controls (zoom, attribution, etc.)
    controls: defaultControls({
      zoom: false,
      attribution: false,
      rotate: false,
    }).extend([
      // Add back the attribution control with specific settings
      new Attribution({
        collapsible: true,
      }),
      // Add rotation control (allows users to reset rotation to North)
      new Rotate({
        autoHide: false,
      }),
    ]),
    view: mapView,
  });

  map.set("name", name);

  return map;
};
