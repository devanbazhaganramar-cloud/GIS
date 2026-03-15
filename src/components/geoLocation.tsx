import { Crosshair } from "lucide-react";
import UIButton from "../helpers/ui-components/ui-button";
import { fromLonLat } from "ol/proj";

export const LocationWidget = ({ map }: any) => {
  const goToLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        map.getView().animate({
          center: fromLonLat([longitude, latitude]),
          zoom: 18,
          duration: 1000,
        });
      },
      (error) => console.warn("Geolocation failed:", error.message),
    );
  };

  return (
    <UIButton
      prefix={<Crosshair size={18} />}
      onClick={goToLocation}
      className="btn-square bg-base-100 shadow-md border-none hover:bg-base-200"
    />
  );
};
