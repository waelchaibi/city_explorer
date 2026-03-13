import  { requestForegroundPermissionsAsync, getCurrentPositionAsync, Accuracy } from 'expo-location';

export const getCurrentLocation = async () => {
  try {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;

    const position = await getCurrentPositionAsync({
      accuracy: Accuracy.Balanced,
    });

    const coords = position?.coords;
    if (!coords) return null;

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy ?? undefined,
      altitude: coords.altitude ?? undefined,
      timestamp: position.timestamp ?? Date.now(),
    };
  } catch (error) {
    return null;
  }
};
