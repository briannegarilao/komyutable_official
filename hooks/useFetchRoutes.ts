import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

// Custom hook to fetch route coordinates
const useFetchRoutes = () => {
  // State to store the route coordinates
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    []
  );

  useEffect(() => {
    // Function to fetch route coordinates from Firestore
    const fetchRouteCoordinates = async () => {
      try {
        // Access the Firestore document containing route data
        const documentSnapshot = await firestore()
          .collection("routes")
          .doc("busRoutes")
          .collection("busEDSARoutes")
          .doc("busNorthbound")
          .get();

        // Check if the document exists
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          // Check if the data contains an array of stops
          if (data && Array.isArray(data.stops)) {
            // Map over the stops to extract valid geopoint coordinates
            const coordinates = data.stops
              .map((stop: any) => {
                if (
                  stop.geopoint &&
                  stop.geopoint.latitude &&
                  stop.geopoint.longitude
                ) {
                  // Return the longitude and latitude as a tuple
                  return [stop.geopoint.longitude, stop.geopoint.latitude];
                } else {
                  return null;
                }
              })
              // Filter out any null values
              .filter((coord): coord is [number, number] => coord !== null);
            // Update the state with the fetched coordinates
            setRouteCoordinates(coordinates);
          }
        }
      } catch (error) {
        // Log any errors that occur during fetching
      }
    };

    // Call the fetch function when the component mounts
    fetchRouteCoordinates();
  }, []); // Empty dependency array means this runs once on mount

  // Return the fetched route coordinates
  return routeCoordinates;
};

export default useFetchRoutes;
