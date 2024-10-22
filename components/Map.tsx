import React, { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import MapBox, { MapView, Camera, LocationPuck } from "@rnmapbox/maps";

MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const Map = () => {
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

  return (
    <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/dark-v11">
      <Camera zoomLevel={12} followZoomLevel={16} followUserLocation />
      <LocationPuck
        puckBearingEnabled
        puckBearing="heading"
        pulsing={{ isEnabled: true }}
      />
    </MapView>
  );
};

export default Map;
