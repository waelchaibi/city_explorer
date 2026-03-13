import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ClusterMarkerInner({ count }) {
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <Text style={styles.text}>{count}</Text>
      </View>
    </View>
  );
}

export const ClusterMarker = memo(ClusterMarkerInner);

const styles = StyleSheet.create({
  root: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(33, 150, 243, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});

