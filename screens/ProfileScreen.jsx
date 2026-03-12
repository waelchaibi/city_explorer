import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StatsCard from '../components/StatsCard';
import { usePlaces } from '../hooks/usePlaces';
import { getMostActiveDay, getTotalPlaces } from '../services/statsService';

export default function ProfileScreen() {
  const { places } = usePlaces();
  const totalPlaces = useMemo(() => getTotalPlaces(places), [places]);
  const mostActive = useMemo(() => getMostActiveDay(places), [places]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Stats</Text>

      <StatsCard title="Total places" value={String(totalPlaces)} icon="📍" color="#2196F3" />
      <StatsCard
        title="Most active day"
        value={mostActive?.day ? `${mostActive.day} (${mostActive.count})` : '—'}
        icon="📅"
        color="#1565C0"
      />

      <View style={styles.block}>
        <Text style={styles.blockTitle}>Data source</Text>
        <Text style={styles.blockText}>Local places stored on device</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f9',
  },
  content: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 6,
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
  },
  block: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 14,
  },
  blockTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111',
    marginBottom: 4,
  },
  blockText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
  },
});
