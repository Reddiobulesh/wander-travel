/**
 * Calculates the Haversine distance between two sets of coordinates in kilometers.
 * @param {number} lat1 
 * @param {number} lon1 
 * @param {number} lat2 
 * @param {number} lon2 
 * @returns {number} Distance in km
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Finds the nearest destination from user coordinates.
 * @param {number} userLat 
 * @param {number} userLon 
 * @param {Array} destinationsList 
 * @returns {Object|null} { destination, distanceKm }
 */
export function findNearestDestination(userLat, userLon, destinationsList = []) {
  if (!destinationsList || destinationsList.length === 0) return null;

  let closest = null;
  let minDistance = Infinity;

  destinationsList.forEach((dest) => {
    if (typeof dest.latitude === "number" && typeof dest.longitude === "number") {
      const dist = calculateDistance(userLat, userLon, dest.latitude, dest.longitude);
      if (dist < minDistance) {
        minDistance = dist;
        closest = dest;
      }
    }
  });

  if (!closest) return null;

  return {
    destination: closest,
    distanceKm: minDistance,
  };
}

/**
 * Calculates estimated commercial jet flight hours based on distance.
 * @param {number} distanceKm 
 * @returns {number} Hours
 */
export function calculateFlightHours(distanceKm) {
  const avgCruisingSpeedKmH = 800;
  const hours = (distanceKm / avgCruisingSpeedKmH) + 0.5; // buffer for taxi & climb
  return Math.round(hours * 10) / 10;
}

/**
 * Calculates compass bearing from origin to destination.
 */
export function calculateCompassDirection(lat1, lon1, lat2, lon2) {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  const compassDeg = (brng + 360) % 360;

  const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
  const index = Math.round(compassDeg / 45) % 8;
  return directions[index];
}
