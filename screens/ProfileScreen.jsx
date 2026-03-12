import React, { useState, useEffect } from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import { styles } from '../styles/styles';
import { getPlaces } from '../services/placesService';

const ProfileScreen = ({navigation}) => {
  const [places, setPlaces] = useState([]);

    const fetchPlaces = async () => {
      try {
        const allPlaces = await getPlaces(); 
        setPlaces(allPlaces);
      } catch (error) {
        console.log('Erreur:', error);
      } 
    };
  useEffect(() => {
    fetchPlaces();
  }, []);

    useEffect(() => {
    navigation.addListener('focus', fetchPlaces);
      }, [navigation]);

  const totalPlaces = places.length;

  const categoryStats = {};
  places.forEach(place => {
    if (place.tags) {
      place.tags.forEach(tag => {
        categoryStats[tag] = (categoryStats[tag] || 0) + 1;
      });
    }
  });

  let totalCategories = 0;
  let topCategories = [];
  for (let cat in categoryStats) {
    topCategories.push({ name: cat, count: categoryStats[cat] });
    totalCategories++;
  }
  topCategories.sort((a, b) => b.count - a.count);
  topCategories = topCategories.slice(0, 3);

  const countsByDay = {};
  places.forEach(place => {
    const day = place.date;
    countsByDay[day] = (countsByDay[day] || 0) + 1;
  });

  let mostActiveDay = 'Aucun';
  let maxCount = 0;
  for (let day in countsByDay) {
    if (countsByDay[day] > maxCount) {
      maxCount = countsByDay[day];
      mostActiveDay = `${day} (${maxCount})`;
    }
  }

return (
  <ScrollView contentContainerStyle={styles.profile.container}>
    <Text style={styles.profile.title}>Mon profil</Text>
    <Text style={styles.profile.subtitle}>
      {totalPlaces} lieux - {totalCategories} catégories
    </Text>

    <View style={styles.profile.statsRow}>
      <View style={styles.profile.statItem}>
        <Text style={styles.profile.statNumber}>{totalPlaces}</Text>
        <Text style={styles.profile.statLabel}>Lieux visités</Text>
      </View>
      <View style={styles.profile.statItem}>
        <Text style={styles.profile.statNumber}>{totalCategories}</Text>
        <Text style={styles.profile.statLabel}>Catégories</Text>
      </View>
      <View style={styles.profile.statItem}>
        <Text style={styles.profile.statNumber}>{mostActiveDay}</Text>
        <Text style={styles.profile.statLabel}>Jour le plus actif</Text>
      </View>
    </View>

    <View style={styles.profile.topCategoriesCard}>
      <Text style={styles.profile.cardTitle}>🏆 Top catégories</Text>
      {topCategories.map((cat, index) => (
        <View key={index} style={styles.profile.categoryRow}>
          <Text style={styles.profile.categoryRank}>#{index + 1}</Text>
          <View style={styles.profile.categoryInfo}>
            <Text style={styles.profile.categoryName}>{cat.name}</Text>
            <Text style={styles.profile.categoryCount}>{cat.count} lieux</Text>
          </View>
        <View style={[
          styles.profile.rankBadge,
                    index === 0 && { backgroundColor: '#FFD700' },   
                    index === 1 && { backgroundColor: '#C0C0C0' },   
                    index === 2 && { backgroundColor: '#CD7F32' }, 
                  ]}> 
            <Text style={styles.profile.rankNumber}>{index + 1}</Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

};

export default ProfileScreen;
