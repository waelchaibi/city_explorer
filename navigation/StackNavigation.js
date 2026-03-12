import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import AddPlaceScreen from '../screens/AddPlaceScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Places' }} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{ title: 'Place' }} />
      <Stack.Screen name="AddPlace" component={AddPlaceScreen} options={{ title: 'Add place' }} />
    </Stack.Navigator>
  );
}
