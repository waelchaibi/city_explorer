export function getPlaceDayKey(place) {
  if (!place || typeof place !== 'object') return null;

  const raw = place.visitedAt ?? place.createdAt ?? place.date;
  if (!raw) return null;

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;

  return d.toISOString().slice(0, 10);
}

