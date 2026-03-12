export function getPlaceDayKey(place) {
  if (!place || typeof place !== 'object') return null;

  const raw = place.visitedAt ?? place.createdAt ?? place.date;
  if (!raw) return null;

  const s = typeof raw === 'string' ? raw.trim() : '';
  if (s) {
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (m) {
      const day = m[1];
      const month = m[2];
      const year = m[3];
      return `${year}-${month}-${day}`;
    }
  }

  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;

  return d.toISOString().slice(0, 10);
}

