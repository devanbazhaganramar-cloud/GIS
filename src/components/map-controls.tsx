import { Plus, Minus, Home } from "lucide-react";
import UIButton from "../helpers/ui-components/ui-button";

export const ZoomInWidget = ({ map }: any) => (
  <UIButton
    prefix={<Plus size={18} />}
    onClick={() => {
      const view = map.getView();
      view.animate({ zoom: view.getZoom() + 1, duration: 250 });
    }}
    className="btn-square bg-base-100 shadow-md border-none hover:bg-base-200"
  />
);

export const ZoomOutWidget = ({ map }: any) => (
  <UIButton
    prefix={<Minus size={18} />}
    onClick={() => {
      const view = map.getView();
      view.animate({ zoom: view.getZoom() - 1, duration: 250 });
    }}
    className="btn-square bg-base-100 shadow-md border-none hover:bg-base-200"
  />
);

export const HomeWidget = ({ map, center, zoom }: any) => (
  <UIButton
    prefix={<Home size={18} />}
    onClick={() => {
      map.getView().animate({ center, zoom, duration: 500 });
    }}
    className="btn-square bg-base-100 shadow-md border-none hover:bg-base-200"
  />
);
