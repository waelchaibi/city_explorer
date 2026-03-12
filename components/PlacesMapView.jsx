import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ClusterMarker } from './ClusterMarker';
import { clusterPlaces } from '../utils/clusterPlaces';
import { getPlaceCoordinate } from '../utils/placeCoordinates';

const MapsModule = (() => {
  try {
    return require('react-native-maps');
  } catch (e) {
    return null;
  }
})();

const MapView = MapsModule?.default ?? null;
const Marker = MapsModule?.Marker ?? null;

function PlacesMapViewInner({
  places,
  initialRegion,
  filters,
  onPlacePress,
  onLongPressCoordinate,
}) {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(initialRegion);

  useEffect(() => {
    setRegion(initialRegion);
  }, [initialRegion]);

  const items = useMemo(() => {
    if (!filters?.enableClustering) {
      if (!Array.isArray(places)) return [];
      return places
        .map((p) => {
          const coordinate = getPlaceCoordinate(p);
          if (!coordinate) return null;
          return { type: 'place', id: p?.id ?? `${coordinate.latitude}-${coordinate.longitude}`, place: p, coordinate };
        })
        .filter(Boolean);
    }
    return clusterPlaces(places, region ?? initialRegion);
  }, [filters?.enableClustering, initialRegion, places, region]);

  if (!MapView || !Marker) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackTitle}>Map unavailable</Text>
        <Text style={styles.fallbackSubtitle}>Install react-native-maps to enable the map.</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      showsUserLocation
      showsMyLocationButton
      loadingEnabled
      ref={mapRef}
      onRegionChangeComplete={setRegion}
      onLongPress={(e) => {
        const c = e?.nativeEvent?.coordinate;
        if (!c || typeof c.latitude !== 'number' || typeof c.longitude !== 'number') return;
        onLongPressCoordinate?.(c);
      }}
    >
      {items.map((item) => {
        if (item.type === 'cluster') {
          return (
            <Marker
              key={item.id}
              coordinate={item.coordinate}
              onPress={() => {
                const next = {
                  latitude: item.coordinate.latitude,
                  longitude: item.coordinate.longitude,
                  latitudeDelta: Math.max((region?.latitudeDelta ?? initialRegion.latitudeDelta) / 2, 0.005),
                  longitudeDelta: Math.max((region?.longitudeDelta ?? initialRegion.longitudeDelta) / 2, 0.005),
                };
                mapRef.current?.animateToRegion?.(next, 260);
              }}
            >
              <ClusterMarker count={item.count} />
            </Marker>
          );
        }

        const place = item.place;
        const title = typeof place?.name === 'string' ? place.name : 'Place';
        const description = typeof place?.description === 'string' ? place.description : undefined;

        return (
          <Marker
            key={item.id}
            coordinate={item.coordinate}
            title={title}
            description={description}
            onPress={() => onPlacePress?.(place?.id)}
          />
        );
      })}
    </MapView>
  );
}

export const PlacesMapView = memo(PlacesMapViewInner);

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  fallbackSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

