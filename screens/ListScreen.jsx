/**
 * List Screen
 * Displays a list of places
 * Placeholder implementation - ready for FlatList with real data
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Screen Placeholder</Text>
      <Text style={styles.subtitle}>Places list will be displayed here...</Text>
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

export default ListScreen;
