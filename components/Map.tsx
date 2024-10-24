import MapBox, { MapView, Camera, LocationPuck } from "@rnmapbox/maps";
import useLocationPermission from "../hooks/useLocationPermission";
import React from "react";

// this is for the mapbox access token
MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const Map = () => {
  // send request permision to use location
  useLocationPermission();

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera zoomLevel={12} followZoomLevel={17} followUserLocation />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
    </MapView>
  );
};

export default Map;
