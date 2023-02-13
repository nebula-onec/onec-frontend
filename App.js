import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./assets/files/SplashScreen.js";
import LoginScreen from "./assets/files/LoginScreen.js";

import { AuthContextProvider } from "./assets/files/myContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNavigator from "./assets/components/BottomNavigator.js";
import ProductDetailsScreen from './assets/Screens/ProductDetailsScreen';
import OrderDetails from "./assets/files/OrderDetails.js";
import AddOProductScreen from "./assets/Screens/AddProductScreen"

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
        <AuthContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" headerMode="none">
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Main"
                component={BottomNavigator}
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
                name="ProductDetails"
                component={ProductDetailsScreen}
                status
              />
              <Stack.Screen
                name="Order Details"
                component={OrderDetails}
                options={{
                  statusBarHeight: 0,
                }}
              />
              <Stack.Screen
                name="Add Product"
                component={AddOProductScreen}
                options={{
                  statusBarHeight: 0,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
    </SafeAreaProvider>
  );
}
