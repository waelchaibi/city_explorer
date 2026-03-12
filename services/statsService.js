export const getTotalPlaces = (places) => {
  return Array.isArray(places) ? places.length : 0;
};

export const getMostActiveDay = (places) => {
  if (!Array.isArray(places) || places.length === 0) return null;

  const countsByDay = new Map();

  for (const place of places) {
    const rawDate = place?.createdAt ?? place?.visitedAt ?? place?.date;
    if (!rawDate) continue;

    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) continue;

    const day = date.toISOString().slice(0, 10);
    countsByDay.set(day, (countsByDay.get(day) ?? 0) + 1);
  }

  if (countsByDay.size === 0) return null;

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
