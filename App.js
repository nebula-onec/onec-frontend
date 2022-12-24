import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProductScreen from './assets/Screens/AddProductScreen';

export default function App() {
  return (
    // <NavigationContainer>
    //   <Screen></Screen>
    // </NavigationContainer>
    <View style={styles.container}>
      <AddProductScreen/>
    </View>
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
