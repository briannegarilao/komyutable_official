import React, { useState } from "react";
import MapBox, {
  MapView,
  Camera,
  LocationPuck,
  ShapeSource,
  LineLayer,
  SymbolLayer,
  Images,
} from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";
import useLocationPermission from "../hooks/useLocationPermission";
import { getDirections } from "../services/directions";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import * as Location from "expo-location";

// file imports
import endPointData from "../data/end_point.json";

// this is for the mapbox access token
MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

// this is for the bus pin image
const pin = require("../assets/images/bus_pin_btn.png");

// MAIN COMPONENT
const Map = () => {
  // constants
  const bussesFeatures = featureCollection(
    endPointData.map(({ id, lat, long }) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lat, long],
      },
      properties: { id },
    }))
  );

  interface Direction {
    routes?: Array<{
      geometry: {
        coordinates: [number, number][];
      };
    }>;
  }

  const [direction, setDirection] = useState<Direction | undefined>();

  const directionCoordinate = direction?.routes?.[0]?.geometry.coordinates;

  const onPointPress = async (event: OnPressEvent) => {
    const myLocation = await Location.getCurrentPositionAsync();

    const newDirection = await getDirections(
      [myLocation.coords.longitude, myLocation.coords.latitude],
      [event.coordinates.longitude, event.coordinates.latitude]
    );
    setDirection(newDirection);
  };

  // send request permision to use location
  useLocationPermission();

  // ------------------------------------------------------------------------------------------------

  return (
    // MAIN MAP: START
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera zoomLevel={12} followZoomLevel={13} followUserLocation />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />

      {/* BUS PIN */}
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

      {/* ROUTE SHAPES */}
      {directionCoordinate && (
        <ShapeSource
          id="routeSource"
          lineMetrics
          shape={{
            properties: {},
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: directionCoordinate,
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
      )}
    </MapView>

    // MAIN MAP: END
  );
};

export default Map;
