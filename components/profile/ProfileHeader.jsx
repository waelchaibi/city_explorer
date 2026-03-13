import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ProfileHeaderInner({ title, subtitle }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

export const ProfileHeader = memo(ProfileHeaderInner);

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center',
  },
});

