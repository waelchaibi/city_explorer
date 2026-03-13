import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deletePlace, getPlaceById } from '../services/placesService';

export default function PlaceDetailScreen({ route, navigation }) {
  const id = route?.params?.id ?? route?.params?.placeId;
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let isActive = true;
    (async () => {
      setIsLoading(true);
      const found = typeof id === 'string' ? await getPlaceById(id) : null;
      if (!isActive) return;
      setPlace(found);
      setIsLoading(false);
    })();
    return () => {
      isActive = false;
    };
  }, [id]);

  const title = useMemo(() => {
    if (typeof place?.name === 'string' && place.name.trim()) return place.name.trim();
    return 'Place';
  }, [place?.name]);

  useEffect(() => {
    navigation?.setOptions?.({ title });
  }, [navigation, title]);

  const tagsText = Array.isArray(place?.tags) ? place.tags.filter(Boolean).join(' · ') : '';
  const dateText = typeof place?.date === 'string' ? place.date : '';

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Loading…</Text>
      </View>
    );
  }

  if (!place) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Place not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {place.imageUri ? <Image source={{ uri: place.imageUri }} style={styles.image} /> : null}

      <View style={styles.card}>
        <Text style={styles.name}>{title}</Text>
        {!!dateText && <Text style={styles.meta}>{dateText}</Text>}
        {!!tagsText && <Text style={styles.meta}>{tagsText}</Text>}
        {!!place.description && <Text style={styles.description}>{place.description}</Text>}

        <View style={styles.row}>
          <Text style={styles.label}>Favorite</Text>
          <Text style={styles.value}>{place.isFavorite ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Coordinates</Text>
          <Text style={styles.value}>
            {typeof place.latitude === 'number' && typeof place.longitude === 'number'
              ? `${place.latitude.toFixed(5)}, ${place.longitude.toFixed(5)}`
              : '—'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.danger, isDeleting && styles.disabled]}
        activeOpacity={0.8}
        disabled={isDeleting}
        onPress={() => {
          if (isDeleting) return;
          Alert.alert('Delete', 'Delete this place?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                setIsDeleting(true);
                try {
                  await deletePlace(place.id);
                  navigation.goBack();
                } finally {
                  setIsDeleting(false);
                }
              },
            },
          ]);
        }}
      >
        <Text style={styles.dangerText}>{isDeleting ? 'Deleting…' : 'Delete'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f6f7f9',
  },
  content: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 6,
  },
  description: {
    marginTop: 6,
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#666',
  },
  value: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  muted: {
    fontSize: 14,
    fontWeight: '800',
    color: '#666',
  },
  danger: {
    marginTop: 12,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 15,
  },
  disabled: {
    opacity: 0.6,
  },
});
