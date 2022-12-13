import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import  { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  return (
    <Text>Heelo</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
