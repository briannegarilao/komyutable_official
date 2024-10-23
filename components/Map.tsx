import React, { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import MapBox, {
  MapView,
  Camera,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
} from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";

// THIS IS FOR THE MAPBOX ACCESS TOKEN
MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

// THIS IS FOR THE BUS PIN IMAGE
const pin = require("../assets/images/bus_pin.png");

// ------------------------------------------------------------------------------------------------

// MAIN COMPONENT
const Map = () => {
  // THIS IS FOR THE MAP PERMISSION
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
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera zoomLevel={12} followZoomLevel={16} followUserLocation />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
      <ShapeSource
        id="scooters"
        shape={featureCollection([point([120.991097, 14.507376])])}
      >
        <SymbolLayer
          id="symbolLocationSymbols"
          minZoomLevel={1}
          style={{
            iconImage: "pin",
            iconAllowOverlap: true,
            iconSize: 0.04,
            iconAnchor: "bottom",
          }}
        />

        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default Map;
