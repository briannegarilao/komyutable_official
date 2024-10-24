import React, { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import MapBox, {
  MapView,
  Camera,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
  LineLayer,
} from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";

// FILE IMPORTS
import route from "../data/route.json";

// THIS IS FOR THE MAPBOX ACCESS TOKEN
MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

// THIS IS FOR THE BUS PIN IMAGE
const pin = require("../assets/images/bus_pin.png");

// ------------------------------------------------------------------------------------------------

// MAIN COMPONENT
const Map = () => {
  // ------------------------------------------------------------------------------------------------

  // CONSTANTS
  const bussesFeatures = featureCollection([point([120.991097, 14.507376])]);

  const directionCoordinate = route.routes[0].geometry.coordinates;

  // ------------------------------------------------------------------------------------------------

  // THIS IS FOR THE MAP PERMISSION: START
  const requestLocationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // END OF MAP PERMISSION

  // ------------------------------------------------------------------------------------------------

  return (
    // MAIN MAP: START
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera zoomLevel={12} followZoomLevel={17} followUserLocation />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />

      {/* BUS PIN */}
      <ShapeSource id="busses" shape={bussesFeatures}>
        <SymbolLayer
          id="symbolLocationSymbols"
          minZoomLevel={1}
          style={{
            iconImage: "pin",
            iconAllowOverlap: true,
            iconSize: 0.04,
            iconAnchor: "bottom",
            visibility: "none", // Use 'visible' or 'none' to control visibility
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
