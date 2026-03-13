import { View, Text, StyleSheet } from 'react-native';

const CalendarBadge = ({ date, eventCount = 0, isSelected = false }) => {
  return (
    <View style={[styles.container, isSelected && styles.selected]}>
      <Text style={styles.date}>Date</Text>
      {eventCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{eventCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  selected: {
    backgroundColor: '#2196F3',
  },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CalendarBadge;
