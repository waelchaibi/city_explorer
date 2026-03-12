

import { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/styles';
import PlaceItem from '../components/PlaceItem';
import { getPlaces } from '../services/placesService';

const ListScreen = ({ navigation }) => {
  const [places, setPlaces] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const loadPlaces = async () => {
    const data = await getPlaces();
    setPlaces(data);
  };

  useEffect(() => {
    loadPlaces();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', loadPlaces);
  }, [navigation]);



  const handlePressPlace = (placeId) => {
    navigation.navigate('PlaceDetail', { placeId });
  };

  const handlePressAdd = () => {
    navigation.navigate('AddPlace');
  };

const filteredPlaces = places.filter((place) => 
  (!dateFilter || place.date?.includes(dateFilter)) &&
  (!categoryFilter || place.tags?.some(tag=>tag.toLowerCase().includes(categoryFilter.toLowerCase()))));

  const renderPlaceItem = ({ item }) => (
    <PlaceItem place={item} onPress={() => handlePressPlace(item.id)} />
  );

  const emptyText =  'Aucun lieu trouvé. Ajoute ton premier spot avec le bouton +.';

  return (
    <View style={styles.list.container}>
      <Text style={styles.list.title}>Mes lieux visités</Text>

      <View style={styles.list.filtersContainer}>
        <View style={styles.list.filterBlock}>
          <Text style={styles.list.filterLabel}>Filtrer par date</Text>
          <TextInput
            style={styles.list.filterInput}
            placeholder="JJ/MM/AAAA"
            value={dateFilter}
            onChangeText={setDateFilter}
          />
        </View>

        <View style={styles.list.filterBlock}>
          <Text style={styles.list.filterLabel}>Filtrer par catégorie</Text>
          <TextInput
            style={styles.list.filterInput}
            placeholder="Ex : parc, musée…"
            value={categoryFilter}
            onChangeText={setCategoryFilter}
          />
        </View>
      </View>

      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaceItem}
        contentContainerStyle={styles.list.listContent}
        ListEmptyComponent={<Text style={styles.list.emptyText}>{emptyText}</Text>}
      />

      <TouchableOpacity
        style={styles.list.fab}
        onPress={handlePressAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.list.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListScreen;
