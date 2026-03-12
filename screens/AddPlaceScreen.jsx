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

  return (
    <ScrollView style={styles.addPlace.root}>
      <Text style={styles.addPlace.title}>Nouveau lieu</Text>

      <TouchableOpacity style={styles.addPlace.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.addPlace.imagePreview} />
        ) : (
          <View style={styles.addPlace.placeholder}>
            <Text style={styles.addPlace.placeholderText}>Choisir photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.addPlace.cameraButton} onPress={takePhoto}>
        <Text style={styles.addPlace.cameraText}>Prendre photo</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.addPlace.input}
        placeholder="Nom du lieu"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.addPlace.input, styles.addPlace.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.addPlace.input}
        placeholder="Tags (séparez par des virgules)"
        value={tags}
        onChangeText={setTags}
      />
      <TextInput
        style={styles.addPlace.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.addPlace.saveButton} onPress={savePlace}>
        <Text style={styles.addPlace.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPlaceScreen;
