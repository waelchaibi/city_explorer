import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@city_explorer_lite/places';

async function readAll() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(places) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.isArray(places) ? places : []));
  } catch {
  }
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function getPlaces() {
  return await readAll();
}

export async function getPlaceById(id) {
  const places = await readAll();
  return places.find((p) => p?.id === id) ?? null;
}

export async function addPlace(place) {
  const places = await readAll();
  const next = {
    id: place?.id ?? makeId(),
    name: typeof place?.name === 'string' ? place.name : '',
    description: typeof place?.description === 'string' ? place.description : '',
    tags: Array.isArray(place?.tags) ? place.tags.filter(Boolean) : [],
    date: typeof place?.date === 'string' ? place.date : '',
    imageUri: typeof place?.imageUri === 'string' ? place.imageUri : null,
    isFavorite: place?.isFavorite === true,
    latitude: typeof place?.latitude === 'number' ? place.latitude : undefined,
    longitude: typeof place?.longitude === 'number' ? place.longitude : undefined,
    createdAt: typeof place?.createdAt === 'string' ? place.createdAt : new Date().toISOString(),
  };

  const updated = [next, ...places];
  await writeAll(updated);
  return next;
}

export async function deletePlace(id) {
  const places = await readAll();
  const next = places.filter((p) => p?.id !== id);
  const removed = next.length !== places.length;
  if (removed) await writeAll(next);
  return removed;
}
