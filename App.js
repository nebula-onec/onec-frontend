import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import SplashScreen from './assets/files/SplashScreen.js';
import LoginScreen from './assets/files/LoginScreen.js';

export default function App() {

  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Screen></Screen>
    </NavigationContainer>
  );
}
