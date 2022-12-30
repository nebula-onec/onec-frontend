import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import SplashScreen from './assets/files/SplashScreen.js';
import LoginScreen from './assets/files/LoginScreen.js';
import AddProductScreen from './assets/Screens/AddProductScreen';
import ProductScreen from './assets/Screens/ProductScreen.js';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
         />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
         />
        <Stack.Screen 
          name="Product" 
          component={AddProductScreen}
          options={{
            headerShown: false,
          }}
         />
        <Stack.Screen 
          name="Product List" 
          component={ProductScreen}
          options={{
            headerShown: false,
          }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
}