import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function StatTileInner({ value, label }) {
  return (
    <View style={styles.root}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export const StatTile = memo(StatTileInner);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2196F3',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#666',
    textAlign: 'center',
  },
});

