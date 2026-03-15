import React from "react";

interface MapControlWrapperProps {
  children: React.ReactNode;
}

const MapControlWrapper: React.FC<MapControlWrapperProps> = ({ children }) => {
  return (
    <div className="absolute top-4 right-4 z-100 flex flex-col gap-2">
      {children}
    </div>
  );
};

export default MapControlWrapper;
