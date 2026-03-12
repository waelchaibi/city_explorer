export const getTotalPlaces = (places) => {
  return Array.isArray(places) ? places.length : 0;
};

export const getMostActiveDay = (places) => {
  if (!Array.isArray(places) || places.length === 0) return null;

  const { getPlaceDayKey } = require('../utils/placeDayKey');

  const countsByDay = new Map();
  for (const place of places) {
    const day = getPlaceDayKey(place);
    if (!day) continue;
    countsByDay.set(day, (countsByDay.get(day) ?? 0) + 1);
  }

  let bestDay = null;
  let bestCount = 0;
  for (const [day, count] of countsByDay.entries()) {
    if (count > bestCount) {
      bestDay = day;
      bestCount = count;
    }
  }

  return bestDay ? { day: bestDay, count: bestCount } : null;
};
