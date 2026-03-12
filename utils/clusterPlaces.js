import { getPlaceCoordinate } from './placeCoordinates';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getPrecisionFromDelta(delta) {
  const d = clamp(typeof delta === 'number' ? delta : 0.08, 0.002, 2);
  if (d <= 0.01) return 3;
  if (d <= 0.04) return 2;
  if (d <= 0.12) return 2;
  if (d <= 0.4) return 1;
  return 0;
}

function roundTo(value, precision) {
  const p = Math.pow(10, precision);
  return Math.round(value * p) / p;
}

export function clusterPlaces(places, region) {
  if (!Array.isArray(places) || places.length === 0) return [];

  const precision = getPrecisionFromDelta(region?.latitudeDelta);
  const groups = new Map();

  for (const place of places) {
    const coordinate = getPlaceCoordinate(place);
    if (!coordinate) continue;

    const keyLat = roundTo(coordinate.latitude, precision);
    const keyLng = roundTo(coordinate.longitude, precision);
    const key = `${keyLat}:${keyLng}`;

    const next = groups.get(key) ?? {
      key,
      count: 0,
      sumLat: 0,
      sumLng: 0,
      places: [],
    };

    next.count += 1;
    next.sumLat += coordinate.latitude;
    next.sumLng += coordinate.longitude;
    next.places.push(place);
    groups.set(key, next);
  }

  return Array.from(groups.values()).map((g) => {
    const latitude = g.sumLat / g.count;
    const longitude = g.sumLng / g.count;

    if (g.count === 1) {
      const place = g.places[0];
      return {
        type: 'place',
        id: place?.id ?? g.key,
        place,
        coordinate: { latitude, longitude },
      };
    }

    return {
      type: 'cluster',
      id: `cluster:${g.key}`,
      count: g.count,
      places: g.places,
      coordinate: { latitude, longitude },
    };
  });
}

