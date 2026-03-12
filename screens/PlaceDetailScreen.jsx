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

  return (
    <View style={styles.placeDetail.root}>
      <Image
        source={
          place.imageUri
            ? { uri: place.imageUri }
            : require('../assets/placeholder.png')
        }
        style={styles.placeDetail.image}
      />
      <View style={styles.placeDetail.contentContainer}>
        <Text style={styles.placeDetail.title}>{place.name}</Text>
        <Text style={styles.placeDetail.date}>{place.date}</Text>
        {place.tags && (
          <Text style={styles.placeDetail.tags}>
            {place.tags.join(' · ')}
          </Text>
        )}
        <Text style={styles.placeDetail.description}>
          {place.description}
        </Text>
      </View>
            <TouchableOpacity
              style={styles.list.fab}
              onPress={handleDelete}
              activeOpacity={0.8}
            >
              <Text style={styles.list.fabText}>-</Text>
            </TouchableOpacity>
    </View>
  );
};

export default PlaceDetailScreen;
