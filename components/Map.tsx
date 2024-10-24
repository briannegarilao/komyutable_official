import React, { useState, useEffect } from "react";
import MapBox, { MapView, Camera, LocationPuck } from "@rnmapbox/maps";
import useLocationPermission from "../hooks/useLocationPermission";
import RouteShape from "./RouteShape";
import { getDirections } from "../services/directions";
import useFetchRoutes from "../hooks/useFetchRoutes";
import useRouteCoordinates from "../hooks/useRouteCoordinates";

// Set the MapBox access token using an environment variable
MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const Map = () => {
  // Request permission to use location
  useLocationPermission();

  // Fetch routes using the custom hook
  const coordinates: [number, number][] = useFetchRoutes() || [];

  // Use the new custom hook
  const routeCoordinates = useRouteCoordinates(coordinates);

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera zoomLevel={12} followZoomLevel={17} followUserLocation />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
      {routeCoordinates.length > 0 && (
        <RouteShape coordinates={routeCoordinates} />
      )}
    </MapView>
  );
};

export default Map;
