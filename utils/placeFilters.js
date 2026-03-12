export function applyPlaceFilters(places, filters) {
  if (!Array.isArray(places) || places.length === 0) return [];

  const category = typeof filters?.category === 'string' && filters.category.trim() ? filters.category.trim() : null;
  const favoritesOnly = !!filters?.favoritesOnly;
  const day = typeof filters?.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(filters.day) ? filters.day : null;
  const { getPlaceDayKey } = require('./placeDayKey');

  return places.filter((p) => {
    if (!p || typeof p !== 'object') return false;

    if (category) {
      const tags = Array.isArray(p.tags) ? p.tags.filter(Boolean) : [];
      const ok = tags.some((t) => String(t).toLowerCase().includes(category.toLowerCase()));
      if (!ok) return false;
    }

    if (favoritesOnly) {
      if (p.isFavorite !== true) return false;
    }

    if (day) {
      if (getPlaceDayKey(p) !== day) return false;
    }

    return true;
  });
}

