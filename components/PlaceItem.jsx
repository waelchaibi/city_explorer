/**
 * Place Item Component
 * Reusable component for displaying a single place in a list
 * Placeholder implementation - ready for styling and data binding
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * PlaceItem Component
 * @param {Object} props
 * @param {Object} props.place - Place data object
 * @param {string} props.place.id - Unique place identifier
 * @param {string} props.place.name - Place name
 * @param {string} props.place.image - Image URL or path
 * @param {Function} props.onPress - Callback when item is pressed
 */
const PlaceItem = ({ place, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.itemContent}>
        <Text style={styles.placeName}>Place Item Placeholder</Text>
        <Text style={styles.placeInfo}>Place details will be displayed here</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemContent: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeInfo: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaceItem;
