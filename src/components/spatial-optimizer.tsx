import React, { useState } from "react";
import {
  Settings,
  Play,
  Layers,
  Box,
  Sliders,
  Save,
  Database,
  Compass,
} from "lucide-react";

// Atomic UI Library Imports
import UIContainer from "../helpers/ui-components/ui-flex-container";
import UIButton from "../helpers/ui-components/ui-button";
import UICard from "../helpers/ui-components/ui-card";
import UIText from "../helpers/ui-components/ui-text";
import OlMapViewer from "./ol-map-viewer";

const SpatialOptimizer: React.FC = () => {
  const [params, setParams] = useState({
    panelAzimuth: 180,
    panelTilt: 30,
    rowSpacing: 5.5,
  });


  return (
    <div className="flex flex-col w-full h-screen bg-base-300 transition-colors duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* LEFT CONFIGURATION DRAWER */}
        <aside className="w-full md:w-85 bg-base-100 border-r border-base-content/5 flex flex-col shadow-2xl z-30 overflow-y-auto custom-scrollbar">
          {/* Header Branding */}
          <div className="p-6 border-b border-base-content/5 bg-base-200/30">
            <UIContainer justify="between" align="center">
              <UIContainer
                direction="column"
                align="start"
                gap="xs"
                className="w-fit"
              >
                <UIText className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                  GeoLedger Engine
                </UIText>
                <UIText
                  type="subheader"
                  className="text-sm font-bold opacity-80"
                >
                  Spatial Optimizer
                </UIText>
              </UIContainer>
              <UIButton
                prefix={<Database size={14} />}
                className="bg-base-300/50 hover:bg-base-300 rounded-full w-9 h-9"
              />
            </UIContainer>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {/* Project Status Card */}
            <UICard
              className="bg-primary/5 border-primary/10 p-4"
              shadow={false}
              body={
                <UIContainer justify="between">
                  <UIContainer
                    direction="column"
                    align="start"
                    gap="xs"
                    className="w-fit"
                  >
                    <span className="text-[9px] font-bold text-secondary uppercase">
                      Project Status
                    </span>
                    <span className="text-xs font-bold text-primary italic">
                      Solar_Layout_01.shp
                    </span>
                  </UIContainer>
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse self-center" />
                </UIContainer>
              }
            />

            {/* Input Section */}
            <div className="space-y-6">
              <UIText className="text-[11px] font-black text-secondary uppercase tracking-widest border-l-2 border-primary pl-3">
                Placement Parameters
              </UIText>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    label: "Azimuth Angle",
                    key: "panelAzimuth",
                    icon: <Compass size={14} />,
                    unit: "°",
                  },
                  {
                    label: "Tilt Angle",
                    key: "panelTilt",
                    icon: <Box size={14} />,
                    unit: "°",
                  },
                  {
                    label: "Row Spacing",
                    key: "rowSpacing",
                    icon: <Layers size={14} />,
                    unit: "m",
                  },
                ].map((item) => (
                  <div key={item.key} className="flex flex-col gap-2">
                    <UIContainer justify="between" className="px-1">
                      <span className="text-[10px] font-bold text-base-content/60 uppercase">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold text-primary">
                        {item.unit}
                      </span>
                    </UIContainer>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary opacity-50 group-focus-within:opacity-100 transition-opacity">
                        {item.icon}
                      </div>
                      <input
                        type="number"
                        value={(params as any)[item.key]}
                        onChange={(e) =>
                          setParams({
                            ...params,
                            [item.key]: Number(e.target.value),
                          })
                        }
                        className="w-full bg-base-200 text-base-content border border-transparent focus:border-primary/20 rounded-xl pl-10 pr-4 py-3 text-sm font-bold outline-none transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto p-6 border-t border-base-content/5 space-y-3 bg-base-200/10">
            <UIButton
              prefix={<Play size={16} />}
              mid="Execute Layout"
              className="w-full bg-primary text-base-100 py-4 font-black uppercase tracking-[0.15em] text-[11px] shadow-xl hover:translate-y"
            />
            <UIButton
              prefix={<Save size={14} />}
              mid="Save Configuration"
              className="w-full bg-transparent border border-base-content/10 hover:bg-base-200 py-3 font-bold text-[10px] uppercase opacity-70"
            />
          </div>
        </aside>

        {/* MAP VIEWPORT */}
        <main className="flex-1 relative">
          <OlMapViewer mapName="spatialOptimizerMap" />

          {/* Floating Tool Dock */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <UICard
              className="p-1 bg-base-100/70 backdrop-blur-xl border-base-content/5 rounded-2xl pointer-events-auto"
              shadow={true}
              body={
                <UIContainer gap="xs" wrap={false}>
                  <UIButton
                    prefix={<Box size={16} />}
                    className="bg-transparent hover:bg-base-200 border-none w-10 h-10"
                    title="3D Engine"
                  />
                  <div className="w-1px h-6 bg-base-content/10 self-center mx-1" />
                  <UIButton
                    prefix={<Layers size={16} />}
                    className="bg-transparent hover:bg-base-200 border-none w-10 h-10"
                    title="Layer Stack"
                  />
                  <UIButton
                    prefix={<Sliders size={16} />}
                    className="bg-transparent hover:bg-base-200 border-none w-10 h-10"
                    title="Analysis Tools"
                  />
                  <div className="w-1px h-6 bg-base-content/10 self-center mx-1" />
                  <UIButton
                    prefix={<Settings size={16} />}
                    className="bg-transparent hover:bg-base-200 border-none w-10 h-10"
                    title="Map Settings"
                  />
                </UIContainer>
              }
            />
          </div>

          {/* User ID Badge - Matching your style */}
          <div className="absolute bottom-6 left-6 z-40">
            <UICard
              className="bg-base-100/80 backdrop-blur-md py-2 px-4 border-base-content/5 rounded-xl"
              shadow={true}
              body={
                <UIContainer gap="sm">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <UIText className="text-[10px] font-black uppercase tracking-widest">
                    Live Session
                  </UIText>
                </UIContainer>
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpatialOptimizer;
