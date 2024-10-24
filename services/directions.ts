const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";

// Function to fetch directions from Mapbox API with multiple waypoints
export async function getDirections(coordinates: [number, number][]) {
  const waypoints = coordinates
    .map((coord) => `${coord[0]},${coord[1]}`)
    .join(";");
  const response = await fetch(
    `${BASE_URL}/driving-traffic/${waypoints}?alternatives=false&annotations=distance%2Cduration&geometries=geojson&overview=full&steps=false&access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
  );
  const json = await response.json();
  return json;
}
