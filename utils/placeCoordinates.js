export function getPlaceCoordinate(place) {
  if (!place || typeof place !== 'object') return null;

  const lat =
    typeof place.latitude === 'number'
      ? place.latitude
      : typeof place.lat === 'number'
        ? place.lat
        : typeof place.location?.latitude === 'number'
          ? place.location.latitude
          : null;

  const lng =
    typeof place.longitude === 'number'
      ? place.longitude
      : typeof place.lng === 'number'
        ? place.lng
        : typeof place.location?.longitude === 'number'
          ? place.location.longitude
          : null;

  if (typeof lat !== 'number' || typeof lng !== 'number') return null;
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  return { latitude: lat, longitude: lng };
}

