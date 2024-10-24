import { useState, useEffect } from "react";
import { getDirections } from "../services/directions";

const useRouteCoordinates = (coordinates: [number, number][]) => {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    []
  );

  useEffect(() => {
    const fetchRoute = async () => {
      if (coordinates.length > 0) {
        try {
          const directions = await getDirections(coordinates);
          const route = directions?.routes?.[0]?.geometry?.coordinates || [];
          setRouteCoordinates(route);
        } catch (error) {
          console.error("Error fetching directions:", error);
          setRouteCoordinates([]);
        }
      }
    };

    fetchRoute();
  }, [coordinates]);

  return routeCoordinates;
};

export default useRouteCoordinates;
