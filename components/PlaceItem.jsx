import { View, Text, Image,StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const PlaceItem = ({ place, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.placeItem.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={
          place.imageUri? { uri: place.imageUri }: require('../assets/placeholder.png')
        }
        style={styles.placeItem.image}
      />
      <View style={styles.placeItem.info}>
        <Text style={styles.placeItem.name}>{place.name}</Text>
        <Text style={styles.placeItem.tags}>
          {place.tags?.join(' · ')}
        </Text>
        <Text style={styles.placeItem.date}>{place.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
