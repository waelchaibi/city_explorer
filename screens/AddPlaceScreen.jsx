import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/styles';
import { addPlace } from '../services/placesService';

const AddPlaceScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const savePlace = async () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom est obligatoire');
      return;
    }

    const placeData = {
      name: name.trim(),
      description: description.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      date,
      imageUri,
    };

    await addPlace(placeData);
    Alert.alert('Succès', 'Lieu ajouté !');
    navigation.goBack();
  };
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
    <View style={styles.container}>
      <Text style={styles.title}>Add Place Screen Placeholder</Text>
      <Text style={styles.subtitle}>Add place form coming soon...</Text>
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

export default AddPlaceScreen;
