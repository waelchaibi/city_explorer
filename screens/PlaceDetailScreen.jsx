import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePlaceById } from '../hooks/usePlaceById';
import { deletePlace } from '../services/placesService';

export default function PlaceDetailScreen({ navigation, route }) {
  const id = route?.params?.id;
  const { place, isLoading } = usePlaceById(id);
  const [isDeleting, setIsDeleting] = useState(false);

  const title = useMemo(() => {
    if (typeof place?.name === 'string' && place.name.trim()) return place.name.trim();
    return 'Place';
  }, [place?.name]);

  React.useEffect(() => {
    navigation?.setOptions?.({ title });
  }, [navigation, title]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{title}</Text>
        {!!place?.category && <Text style={styles.category}>{place.category}</Text>}
        {!!place?.description && <Text style={styles.description}>{place.description}</Text>}

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Favorite</Text>
          <Text style={styles.metaValue}>{place.isFavorite ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>Coordinates</Text>
          <Text style={styles.metaValue}>
            {typeof place.latitude === 'number' && typeof place.longitude === 'number'
              ? `${place.latitude.toFixed(5)}, ${place.longitude.toFixed(5)}`
              : '—'}
          </Text>
        </View>
      </View>

      <Pressable
        style={[styles.danger, isDeleting && styles.disabled]}
        disabled={isDeleting}
        onPress={() => {
          if (isDeleting) return;
          Alert.alert('Delete place', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                setIsDeleting(true);
                try {
                  await deletePlace(place.id);
                  navigation.goBack();
                } catch (e) {
                  Alert.alert('Error', 'Failed to delete place.');
                } finally {
                  setIsDeleting(false);
                }
              },
            },
          ]);
        }}
      >
        <Text style={styles.dangerText}>{isDeleting ? 'Deleting…' : 'Delete'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  muted: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
  container: {
    padding: 16,
    backgroundColor: '#f6f7f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1565C0',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  metaLabel: {
    color: '#666',
    fontWeight: '700',
    fontSize: 13,
  },
  metaValue: {
    color: '#111',
    fontWeight: '800',
    fontSize: 13,
  },
  danger: {
    marginTop: 12,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
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
