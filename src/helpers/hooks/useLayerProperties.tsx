import { View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { OSM, XYZ } from "ol/source";

const mapView = new View({
  center: fromLonLat([80.2707, 13.0827]),
  zoom: 14,
  smoothExtentConstraint: true,
  showFullExtent: true,
});

const mapBaseLayerLt = new TileLayer({
  source: new OSM(),
  visible: true,
});
mapBaseLayerLt.set("id", "base-light");
mapBaseLayerLt.set("name", "Street Map (Light)");

const mapBaseLayerDt = new TileLayer({
  visible: false,
  source: new XYZ({
    url: "https://{a-c}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attributions: "© OpenStreetMap contributors © CARTO",
    crossOrigin: "anonymous",
  }),
});
mapBaseLayerDt.set("id", "base-dark");
mapBaseLayerDt.set("name", "Street Map (Dark)");

const mapBaseLayerSl = new TileLayer({
  preload: Infinity,
  visible: false,
  source: new XYZ({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attributions:
      "Tiles © Esri — Source: Esri, i-cubed, and the GIS User Community",
    crossOrigin: "anonymous",
  }),
});
mapBaseLayerSl.set("id", "base-satellite");
mapBaseLayerSl.set("name", "Satellite Imagery");

export { mapView, mapBaseLayerLt, mapBaseLayerDt, mapBaseLayerSl };
