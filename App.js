import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import SplashScreen from './assets/files/SplashScreen.js';
import LoginScreen from './assets/files/LoginScreen.js';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}