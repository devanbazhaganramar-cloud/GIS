import React, { Fragment } from "react";
import OlMapViewer from "./ol-map-viewer";
import UISidebar from "../helpers/ui-components/ui-sidebar";
import SpatialOptimizerForm from "./spatial-optimizer-form";

const SpatialOptimizer: React.FC = () => {
  return (
    <Fragment>
      <div className="w-screen h-screen">
        <UISidebar
          title="Spatial Optimizer"
          body={<SpatialOptimizerForm />}
          footer={<p className="text-xs">v1.0.4</p>}
          className="border-gray-500"
          style={{ backdropFilter: "blur(10px)" }}
        />{" "}
        <OlMapViewer mapName="spatialOptimizerMap" enableDragAndDrop />
      </div>
    </Fragment>
  );
};

export default SpatialOptimizer;
