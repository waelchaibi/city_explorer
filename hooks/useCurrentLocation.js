import { useEffect, useMemo, useState } from 'react';
import { getCurrentLocation } from '../services/locationService';

export function useCurrentLocation() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    (async () => {
      setIsLoading(true);
      const next = await getCurrentLocation();
      if (!isActive) return;
      setLocation(next);
      setIsLoading(false);
    })();

    return () => {
      isActive = false;
    };
  }, []);

  return useMemo(() => ({ location, isLoading }), [location, isLoading]);
}

