import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigation from './TabsNavigation';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabsNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="AddPlace" component={AddPlaceScreen} options={{ title: 'Add place' }} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{ title: 'Place' }} />
    </Stack.Navigator>
  );
}

