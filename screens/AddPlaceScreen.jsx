import { useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibraryAsync, launchCameraAsync , MediaTypeOptions } from 'expo-image-picker';
import { addPlace } from '../services/placesService';

export default function AddPlaceScreen({ navigation, route }) {
  const coordinate = route?.params?.coordinate;

  const initialCoords = useMemo(() => {
    const lat = coordinate?.latitude;
    const lng = coordinate?.longitude;
    if (typeof lat !== 'number' || typeof lng !== 'number') return {};
    return { latitude: lat, longitude: lng };
  }, [coordinate?.latitude, coordinate?.longitude]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [imageUri, setImageUri] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1]
    });
    if (!result.canceled) setImageUri(result.assets?.[0]?.uri ?? null);
  };

  const takePhoto = async () => {
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1,1]
    });
    if (!result.canceled) setImageUri(result.assets?.[0]?.uri ?? null);
  };

  const savePlace = async () => {
    if (isSaving) return;
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom est obligatoire');
      return;
    }

    setIsSaving(true);
    try {
      const placeData = {
        name: name.trim(),
        description: description.trim(),
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        date,
        imageUri,
        isFavorite,
        latitude: initialCoords.latitude,
        longitude: initialCoords.longitude,
      };

      await addPlace(placeData);
      navigation.goBack();
    } catch {
      Alert.alert('Erreur', "Impossible d'ajouter le lieu");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Ajouter un lieu</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Tags (séparés par virgule)"
        value={tags}
        onChangeText={setTags}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (JJ/MM/AAAA)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity
        style={[styles.pill, isFavorite && styles.pillActive]}
        onPress={() => setIsFavorite((v) => !v)}
        activeOpacity={0.8}
      >
        <Text style={[styles.pillText, isFavorite && styles.pillTextActive]}>
          {isFavorite ? 'Favori' : 'Marquer en favori'}
        </Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.secondaryButton} onPress={pickImage} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Galerie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={takePhoto} activeOpacity={0.8}>
          <Text style={styles.secondaryButtonText}>Caméra</Text>
        </TouchableOpacity>
      </View>

      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}

      <TouchableOpacity style={[styles.primaryButton, isSaving && styles.disabled]} onPress={savePlace} activeOpacity={0.8}>
        <Text style={styles.primaryButtonText}>{isSaving ? 'Enregistrement…' : 'Enregistrer'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  pill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  pillActive: {
    borderColor: '#2196F3',
    backgroundColor: 'rgba(33,150,243,0.08)',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#333',
  },
  pillTextActive: {
    color: '#1565C0',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  secondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#333',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  primaryButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#fff',
  },
  disabled: {
    opacity: 0.6,
  },
});
