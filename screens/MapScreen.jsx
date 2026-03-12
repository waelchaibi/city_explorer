import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapFiltersBar } from '../components/MapFiltersBar';
import { PlacesMapView } from '../components/PlacesMapView';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { usePlaces } from '../hooks/usePlaces';
import { applyPlaceFilters } from '../utils/placeFilters';

const DEFAULT_REGION = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function MapScreen({ navigation, route }) {
  const { location } = useCurrentLocation();
  const { places } = usePlaces();

  const filters = useMemo(() => {
    const p = route?.params ?? {};
    return {
      category: typeof p.category === 'string' ? p.category : '',
      favoritesOnly: p.favoritesOnly === true || p.favoritesOnly === 'true',
      day: typeof p.day === 'string' ? p.day : '',
      enableClustering: p.enableClustering !== false && p.enableClustering !== 'false',
    };
  }, [route?.params]);

  const setFilters = useCallback(
    (next) => {
      navigation?.setParams?.({
        category: next?.category ?? '',
        favoritesOnly: !!next?.favoritesOnly,
        day: next?.day ?? '',
        enableClustering: next?.enableClustering !== false,
      });
    },
    [navigation]
  );

  const initialRegion = useMemo(() => {
    if (!location) return DEFAULT_REGION;
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  }, [location]);

  const filteredPlaces = useMemo(() => applyPlaceFilters(places, filters), [filters, places]);

  return (
    <View style={styles.container}>
      <MapFiltersBar value={filters} onChange={setFilters} />
      <PlacesMapView
        places={filteredPlaces}
        initialRegion={initialRegion}
        filters={filters}
        onPlacePress={(id) => navigation.navigate('PlaceDetail', { id })}
        onLongPressCoordinate={(coordinate) => navigation.navigate('AddPlace', { coordinate })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
