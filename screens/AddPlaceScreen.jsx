import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { PlaceForm } from '../components/places/PlaceForm';
import { addPlace } from '../services/placesService';

export default function AddPlaceScreen({ navigation, route }) {
  const coordinate = route?.params?.coordinate;
  const [isSaving, setIsSaving] = useState(false);

  const initialValue = useMemo(() => {
    const lat = coordinate?.latitude;
    const lng = coordinate?.longitude;
    const hasCoords = typeof lat === 'number' && typeof lng === 'number';
    return hasCoords ? { latitude: lat, longitude: lng } : {};
  }, [coordinate?.latitude, coordinate?.longitude]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <PlaceForm
            initialValue={initialValue}
            submitLabel={isSaving ? 'Saving…' : 'Save'}
            onSubmit={async (form) => {
              if (isSaving) return;
              setIsSaving(true);

              try {
                const visitedAt =
                  typeof form.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(form.day)
                    ? `${form.day}T00:00:00.000Z`
                    : undefined;

                await addPlace({
                  name: form.name,
                  description: form.description,
                  category: form.category,
                  isFavorite: form.isFavorite,
                  visitedAt,
                  latitude: initialValue.latitude,
                  longitude: initialValue.longitude,
                });

                navigation.goBack();
              } catch (e) {
                Alert.alert('Error', 'Failed to save place.');
              } finally {
                setIsSaving(false);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f9',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
