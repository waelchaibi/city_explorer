import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@city_explorer_lite/places';

async function readPlacesFromStorage() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function writePlacesToStorage(places) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.isArray(places) ? places : []));
  } catch (error) {
  }
}

export const getPlaces = async () => {
  return await readPlacesFromStorage();
};

export const addPlace = async (place) => {
  const existing = await readPlacesFromStorage();

  const now = new Date().toISOString();
  const id = place?.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const nextPlace = { ...place, id, createdAt: place?.createdAt ?? now };

  const next = [nextPlace, ...existing];
  await writePlacesToStorage(next);

  return nextPlace;
};

export const deletePlace = async (id) => {
  const existing = await readPlacesFromStorage();
  const next = existing.filter((p) => p?.id !== id);

  const removed = next.length !== existing.length;
  if (removed) {
    await writePlacesToStorage(next);
  }

  return removed;
};
