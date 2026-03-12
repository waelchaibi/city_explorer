import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { usePlaces } from '../hooks/usePlaces';
import { getPlaceDayKey } from '../utils/placeDayKey';

function buildMarkedDates(places, selectedDay) {
  const marked = {};

  if (Array.isArray(places)) {
    for (const p of places) {
      const day = getPlaceDayKey(p);
      if (!day) continue;
      marked[day] = { marked: true, dotColor: '#2196F3' };
    }
  }

  if (typeof selectedDay === 'string' && selectedDay) {
    const wasMarked = marked[selectedDay]?.marked === true;
    marked[selectedDay] = {
      ...(marked[selectedDay] ?? {}),
      selected: true,
      selectedColor: '#2196F3',
      selectedTextColor: '#fff',
      selectedDotColor: wasMarked ? '#fff' : undefined,
    };
  }

  return marked;
}

export default function CalendarScreen({ navigation, route }) {
  const { places } = usePlaces();

  const selectedDay = useMemo(() => {
    const day = route?.params?.day;
    return typeof day === 'string' ? day : '';
  }, [route?.params?.day]);

  const markedDates = useMemo(() => buildMarkedDates(places, selectedDay), [places, selectedDay]);

  const selectedCount = useMemo(() => {
    if (!selectedDay) return 0;
    if (!Array.isArray(places)) return 0;
    let n = 0;
    for (const p of places) {
      if (getPlaceDayKey(p) === selectedDay) n += 1;
    }
    return n;
  }, [places, selectedDay]);

  const onDayPress = useCallback(
    (day) => {
      const next = day?.dateString;
      if (typeof next !== 'string' || !next) return;

      navigation?.setParams?.({ day: next });
      navigation.navigate('Map', { day: next });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="dot"
        theme={{
          todayTextColor: '#1565C0',
          arrowColor: '#1565C0',
          selectedDayBackgroundColor: '#2196F3',
          selectedDayTextColor: '#fff',
        }}
      />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{selectedDay ? selectedDay : 'Select a day'}</Text>
        <Text style={styles.panelSubtitle}>
          {selectedDay ? `${selectedCount} place(s)` : 'Days with places are marked'}
        </Text>

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !selectedDay && styles.buttonDisabled]}
            disabled={!selectedDay}
            onPress={() => navigation.navigate('Map', { day: selectedDay })}
          >
            <Text style={styles.buttonText}>Show on map</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonSecondary, !selectedDay && styles.buttonSecondaryDisabled]}
            disabled={!selectedDay}
            onPress={() => navigation?.setParams?.({ day: '' })}
          >
            <Text style={styles.buttonSecondaryText}>Clear</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  panel: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111',
  },
  panelSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
  buttonSecondary: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonSecondaryDisabled: {
    opacity: 0.5,
  },
  buttonSecondaryText: {
    color: '#333',
    fontWeight: '900',
    fontSize: 14,
  },
});
