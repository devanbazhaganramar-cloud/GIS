import { Fill, Stroke, Style, Circle as CircleStyle } from "ol/style";

interface getStyleParams {
  color?: string;        // Primary stroke/accent color
  strokeWidth?: number;  // Thickness of the line
  fillOpacity?: number;  // Transparency (0 to 1)
}

/**
 * Enhanced RGBA converter to handle the "Gray 70% Transparent" look
 */
function convertToRGBA(color: string, opacity: number): string {
  // If color is a simple name, map to tech-theme slate
  if (color === "gray" || color === "slate") return `rgba(71, 85, 105, ${opacity})`;
  
  // Default fallback for hex/rgb logic
  return `rgba(100, 116, 139, ${opacity})`; 
}

const getDynamicStyle = ({
  // Defaulting to a clean Slate-500 gray for that high-tech UI feel
  color = "#64748b", 
  strokeWidth = 1.5,
  fillOpacity = 0.3, // 70% transparent means 0.3 opacity
}: getStyleParams = {}): Style => {
  
  const fillColor = convertToRGBA(color, fillOpacity);

  return new Style({
    // 1. Stroke for Polygons and Lines
    stroke: new Stroke({
      color: color, 
      width: strokeWidth,
    }),
    
    // 2. 70% Transparent Fill for Polygons
    fill: new Fill({
      color: fillColor,
    }),

    // 3. Image Style (Crucial for Points to be visible)
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: fillColor,
      }),
      stroke: new Stroke({
        color: color,
        width: strokeWidth,
      }),
    }),
  });
};

export { getDynamicStyle };