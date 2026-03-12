import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getPlaces } from '../services/placesService';

export function usePlaces() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    const next = await getPlaces();
    setPlaces(Array.isArray(next) ? next : []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  return useMemo(() => ({ places, isLoading, reload }), [places, isLoading, reload]);
}

