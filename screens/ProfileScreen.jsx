import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import StatsCard from '../components/StatsCard';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatTile } from '../components/profile/StatTile';
import { TopTagsCard } from '../components/profile/TopTagsCard';
import { usePlaces } from '../hooks/usePlaces';
import { getMostActiveDay, getTotalPlaces } from '../services/statsService';
import { getTagStats } from '../utils/tagStats';

export default function ProfileScreen() {
  const { places } = usePlaces();
  const totalPlaces = useMemo(() => getTotalPlaces(places), [places]);
  const mostActive = useMemo(() => getMostActiveDay(places), [places]);
  const tagStats = useMemo(() => getTagStats(places), [places]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileHeader
        title="Mon profil"
        subtitle={`${totalPlaces} lieux - ${tagStats.totalTags} tags`}
      />

      <View style={styles.tilesRow}>
        <StatTile value={String(totalPlaces)} label="Lieux visités" />
        <StatTile value={String(tagStats.totalTags)} label="Tags" />
        <StatTile value={mostActive?.day ? mostActive.day : '—'} label="Jour le plus actif" />
      </View>

      <StatsCard title="places visitées totales" value={String(totalPlaces)} icon="📍" color="#2196F3" />
      <StatsCard
        title="le jour le plus actif"
        value={mostActive?.day ? `${mostActive.day} (${mostActive.count})` : '—'}
        icon="📅"
        color="#1565C0"
      />

      <TopTagsCard items={tagStats.topTags} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f9',
  },
  content: {
    paddingBottom: 20,
  },
  tilesRow: {
    marginHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    marginBottom: 4,
  },
});
