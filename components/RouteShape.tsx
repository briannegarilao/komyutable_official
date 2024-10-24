import React from "react";
import { ShapeSource, LineLayer } from "@rnmapbox/maps";

interface RouteShapeProps {
  coordinates: [number, number][] | undefined;
}

const RouteShape: React.FC<RouteShapeProps> = ({ coordinates }) => {
  if (!coordinates) return null;

  return (
    <ShapeSource
      id="routeSource"
      lineMetrics
      shape={{
        properties: {},
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates,
        },
      }}
    >
      <LineLayer
        id="exampleLineLayer"
        style={{
          lineColor: "#1967b2",
          lineCap: "round",
          lineJoin: "round",
          lineWidth: 7,
        }}
      />
    </ShapeSource>
  );
};

export default RouteShape;
