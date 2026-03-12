import AsyncStorage from '@react-native-async-storage/async-storage';

const PLACES_KEY = 'places';


export const getPlaces = async () => {
  try {
    const json = await AsyncStorage.getItem(PLACES_KEY);
    if (!json) {
      return [];
    }
    return JSON.parse(json);
  } catch (error) {
    console.error('getPlaces error:', error);
    return [];
  }
};


const savePlaces = async (places) => {
  try {
    const json = JSON.stringify(places);
    await AsyncStorage.setItem(PLACES_KEY, json);
  } catch (error) {
    console.error('savePlaces error:', error);
  }
};


export const getPlaceById = async (placeId) => {
  try {
    const places = await getPlaces();
    return places.find((p) => p.id === placeId) || null;
  } catch (error) {
    console.error('getPlaceById error:', error);
    return null;
  }
};


export const addPlace = async (placeData) => {
  try {
    const places = await getPlaces();

    const newPlace = {
      id: Date.now().toString(),
      ...placeData,
    };

    const updated = [...places, newPlace];
    await savePlaces(updated);

    return newPlace;
  } catch (error) {
    console.error('addPlace error:', error);
    throw error;
  }
};


export const updatePlace = async (placeId, placeData) => {
  try {
    const places = await getPlaces();
    const index = places.findIndex((p) => p.id === placeId);
    if (index === -1) {
      return null;
    }

    const updatedPlace = { ...places[index], ...placeData };
    const updated = [...places];
    updated[index] = updatedPlace;

    await savePlaces(updated);
    return updatedPlace;
  } catch (error) {
    console.error('updatePlace error:', error);
    throw error;
  }
};


export const deletePlace = async (placeId) => {
  try {
    const places = await getPlaces();
    const updated = places.filter((p) => p.id !== placeId);
    await savePlaces(updated);
    return true;
  } catch (error) {
    console.error('deletePlace error:', error);
    return false;
  }
};


export const searchPlaces = async (query) => {
  try {
    const places = await getPlaces();
    const q = query.trim().toLowerCase();
    if (!q) return places;

    return places.filter((p) => {
      return (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    });
  } catch (error) {
    console.error('searchPlaces error:', error);
    return [];
  }
};


export const getPlacesByCategory = async (category) => {
  try {
    const places = await getPlaces();
    const c = category.trim().toLowerCase();
    if (!c) return places;
    return places.filter(
      (p) => p.category && p.category.toLowerCase() === c
    );
  } catch (error) {
    console.error('getPlacesByCategory error:', error);
    return [];
  }
};


export const getPlacesNearby = async (latitude, longitude, radiusKm = 5) => {
  try {
    const places = await getPlaces();
    return places;
  } catch (error) {
    console.error('getPlacesNearby error:', error);
    return [];
  }
};
