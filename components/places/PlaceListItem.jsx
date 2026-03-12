import React, { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function formatCoords(place) {
  const lat = typeof place?.latitude === 'number' ? place.latitude : null;
  const lng = typeof place?.longitude === 'number' ? place.longitude : null;
  if (typeof lat !== 'number' || typeof lng !== 'number') return '';
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

function PlaceListItemInner({ place, onPress }) {
  const title = useMemo(() => {
    if (typeof place?.name === 'string' && place.name.trim()) return place.name.trim();
    return 'Place';
  }, [place?.name]);

  const category = typeof place?.category === 'string' ? place.category.trim() : '';
  const coords = formatCoords(place);

  return (
    <Pressable style={styles.root} onPress={onPress}>
      <View style={styles.topRow}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {place?.isFavorite ? <Text style={styles.badge}>Fav</Text> : null}
      </View>

      {!!category && (
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>
      )}

      {!!coords && (
        <Text style={styles.coords} numberOfLines={1}>
          {coords}
        </Text>
      )}
    </Pressable>
  );
}

export const PlaceListItem = memo(PlaceListItemInner);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '900',
    color: '#111',
  },
  badge: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1565C0',
    backgroundColor: 'rgba(33,150,243,0.10)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  category: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '800',
    color: '#333',
  },
  coords: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#777',
  },
});

