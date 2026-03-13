import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function normalizeBool(v) {
  return v === true || v === 'true' || v === 1 || v === '1';
}

function normalizeString(v) {
  return typeof v === 'string' ? v : '';
}

function MapFiltersBarInner({ value, onChange }) {
  const favoritesOnly = normalizeBool(value?.favoritesOnly);
  const category = normalizeString(value?.category);
  const day = normalizeString(value?.day);
  const enableClustering = value?.enableClustering !== false && value?.enableClustering !== 'false';

  const presets = useMemo(
    () => [
      { key: 'all', label: 'All', category: '' },
      { key: 'food', label: 'Food', category: 'Food' },
      { key: 'park', label: 'Park', category: 'Park' },
      { key: 'museum', label: 'Museum', category: 'Museum' },
    ],
    []
  );

  const setPatch = (patch) => onChange?.({ ...value, ...patch });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {presets.map((p) => {
          const isActive = (category || '') === p.category;
          return (
            <Pressable
              key={p.key}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setPatch({ category: p.category })}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>{p.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.row}>
        <Pressable
          style={[styles.pill, favoritesOnly && styles.pillActive]}
          onPress={() => setPatch({ favoritesOnly: !favoritesOnly })}
        >
          <Text style={[styles.pillText, favoritesOnly && styles.pillTextActive]}>Favorites</Text>
        </Pressable>

        <Pressable style={[styles.pill, !!day && styles.pillActive]} onPress={() => setPatch({ day: day ? '' : today })}>
          <Text style={[styles.pillText, !!day && styles.pillTextActive]}>{day ? day : 'Any day'}</Text>
        </Pressable>

        <Pressable
          style={[styles.pill, enableClustering && styles.pillActive]}
          onPress={() => setPatch({ enableClustering: !enableClustering })}
        >
          <Text style={[styles.pillText, enableClustering && styles.pillTextActive]}>Cluster</Text>
        </Pressable>
      </View>
    </View>
  );
}

export const MapFiltersBar = memo(MapFiltersBarInner);

const styles = StyleSheet.create({
  root: {
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  pillActive: {
    borderColor: '#2196F3',
    backgroundColor: 'rgba(33,150,243,0.08)',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  pillTextActive: {
    color: '#1565C0',
  },
});

