/**
 * City Explorer Lite - Main App Entry Point
 * Expo SDK 54 with JSX
 * 
 * This is the root component that wraps the entire application.
 * It sets up the NavigationContainer and renders the main navigation structure.
 */

import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigation from './navigation/TabsNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <TabsNavigation />
    </NavigationContainer>
  );
}
