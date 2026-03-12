export function getTagStats(places) {
  const counts = new Map();

  if (Array.isArray(places)) {
    for (const p of places) {
      const tags = Array.isArray(p?.tags) ? p.tags : [];
      for (const raw of tags) {
        const t = typeof raw === 'string' ? raw.trim() : '';
        if (!t) continue;
        counts.set(t, (counts.get(t) ?? 0) + 1);
      }
    }
  }

  const sorted = Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalTags: counts.size,
    topTags: sorted.slice(0, 3),
  };
}

