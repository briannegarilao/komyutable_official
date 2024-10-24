import React from "react";
import { ShapeSource, SymbolLayer, Images } from "@rnmapbox/maps";

const pin = require("../assets/images/bus_pin_btn.png");

// Props for BusPin component
interface BusPinProps {
  bussesFeatures: any; // Features for bus pins
  onPointPress: (event: any) => void; // Point press handler
}

// Bus pin component
const BusPin: React.FC<BusPinProps> = ({ bussesFeatures, onPointPress }) => (
  <ShapeSource id="busses" shape={bussesFeatures} onPress={onPointPress}>
    <SymbolLayer
      id="symbolLocationSymbols"
      minZoomLevel={1}
      style={{
        iconImage: "pin",
        iconAllowOverlap: true,
        iconSize: 0.2,
        iconAnchor: "bottom",
        visibility: "visible", // Control visibility
      }}
    />
    <Images images={{ pin }} />
  </ShapeSource>
);

// Export BusPin component
export default BusPin;
