import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function TagRow({ rank, name, count }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rank}>#{rank}</Text>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.count}>{count} lieux</Text>
      </View>
      <View
        style={[
          styles.badge,
          rank === 1 && styles.badgeGold,
          rank === 2 && styles.badgeSilver,
          rank === 3 && styles.badgeBronze,
        ]}
      >
        <Text style={styles.badgeText}>{rank}</Text>
      </View>
    </View>
  );
}

function TopTagsCardInner({ items }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Top tags</Text>
      {Array.isArray(items) && items.length ? (
        items.map((t, idx) => <TagRow key={`${t.name}-${idx}`} rank={idx + 1} name={t.name} count={t.count} />)
      ) : (
        <Text style={styles.empty}>Aucun tag</Text>
      )}
    </View>
  );
}

export const TopTagsCard = memo(TopTagsCardInner);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#f1f1f1',
  },
  rank: {
    width: 34,
    fontWeight: '900',
    color: '#777',
  },
  info: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111',
  },
  count: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGold: {
    backgroundColor: '#FFD700',
  },
  badgeSilver: {
    backgroundColor: '#C0C0C0',
  },
  badgeBronze: {
    backgroundColor: '#CD7F32',
  },
  badgeText: {
    color: '#111',
    fontWeight: '900',
  },
  empty: {
    fontSize: 13,
    fontWeight: '700',
    color: '#777',
  },
});

