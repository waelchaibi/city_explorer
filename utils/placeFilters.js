export function applyPlaceFilters(places, filters) {
  if (!Array.isArray(places) || places.length === 0) return [];

  const category = typeof filters?.category === 'string' && filters.category.trim() ? filters.category.trim() : null;
  const favoritesOnly = !!filters?.favoritesOnly;
  const day = typeof filters?.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(filters.day) ? filters.day : null;

  return places.filter((p) => {
    if (!p || typeof p !== 'object') return false;

    if (category) {
      const c = typeof p.category === 'string' ? p.category : '';
      if (c.toLowerCase() !== category.toLowerCase()) return false;
    }

    if (favoritesOnly) {
      if (p.isFavorite !== true) return false;
    }

    if (day) {
      const raw = p.visitedAt ?? p.createdAt ?? p.date;
      if (!raw) return false;
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) return false;
      if (d.toISOString().slice(0, 10) !== day) return false;
    }

    return true;
  });
}

