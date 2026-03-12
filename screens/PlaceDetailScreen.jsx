import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { deletePlace, getPlaceById } from '../services/placesService';

const PlaceDetailScreen = ({ route ,navigation }) => {
  const { placeId } = route.params;
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const load = async () => {
      const found = await getPlaceById(placeId);
      setPlace(found);
    };
    load();
  }, [placeId]);



  if (!place) {
    return (
      <View style={styles.placeDetail.center}>
        <Text style={styles.placeDetail.errorText}>Lieu introuvable.</Text>
      </View>
    );
  }

  const handleDelete = async () => {
  await deletePlace(placeId);
  navigation.navigate('List');
    };
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
    <View style={styles.container}>
      <Text style={styles.title}>Place Detail Screen Placeholder</Text>
      <Text style={styles.subtitle}>Detailed place information coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default PlaceDetailScreen;
