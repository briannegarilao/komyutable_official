import React from "react";
import { ShapeSource, SymbolLayer, Images } from "@rnmapbox/maps";

const pin = require("../assets/images/bus_pin_btn.png");

interface BusPinProps {
  bussesFeatures: any;
  onPointPress: (event: any) => void;
}

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
        visibility: "visible", // Use 'visible' or 'none' to control visibility
      }}
    />
    <Images images={{ pin }} />
  </ShapeSource>
);

export default BusPin;
