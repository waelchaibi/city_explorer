import React, { memo, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlaceListItem } from './PlaceListItem';

function PlacesFlatListInner({ places, onPlacePress }) {
  const renderItem = useCallback(
    ({ item }) => <PlaceListItem place={item} onPress={() => onPlacePress?.(item?.id)} />,
    [onPlacePress]
  );

  return (
    <FlatList
      data={Array.isArray(places) ? places : []}
      keyExtractor={(item, index) => (item?.id ? String(item.id) : String(index))}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No places</Text>
          <Text style={styles.emptySubtitle}>Select a day that has markers</Text>
        </View>
      }
    />
  );
}

export const PlacesFlatList = memo(PlacesFlatListInner);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  separator: {
    height: 10,
  },
  empty: {
    paddingTop: 18,
    paddingBottom: 8,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111',
  },
  emptySubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#777',
    textAlign: 'center',
  },
});

