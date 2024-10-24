import React, { useState } from "react";
import MapBox, { MapView, Camera, LocationPuck } from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";
import useLocationPermission from "../hooks/useLocationPermission";
import { getDirections } from "../services/directions";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import * as Location from "expo-location";
import BusPin from "./BusPin";
import RouteShape from "./RouteShape";
import endPointData from "../data/end_point.json";

// this is for the mapbox access token
MapBox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

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
      <BusPin bussesFeatures={bussesFeatures} onPointPress={onPointPress} />

      {/* ROUTE SHAPES */}
      <RouteShape coordinates={directionCoordinate} />
    </MapView>

    // MAIN MAP: END
  );
};

export default Map;
