import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Screen></Screen>
    </NavigationContainer>
  );
}
