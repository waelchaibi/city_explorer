import { useEffect, useMemo, useState } from 'react';
import { getPlaces } from '../services/placesService';

export function usePlaceById(id) {
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    (async () => {
      setIsLoading(true);
      const places = await getPlaces();
      const found = Array.isArray(places) ? places.find((p) => p?.id === id) : null;
      if (!isActive) return;
      setPlace(found ?? null);
      setIsLoading(false);
    })();

    return () => {
      isActive = false;
    };
  }, [id]);

  return useMemo(() => ({ place, isLoading }), [place, isLoading]);
}

