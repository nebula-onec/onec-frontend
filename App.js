import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useContext, useState } from "react";

import SplashScreen from "./assets/files/SplashScreen.js";
import LoginScreen from "./assets/files/LoginScreen.js";
import AddProductScreen from "./assets/Screens/AddProductScreen";

import HomeScrren from "./assets/files/HomeScreen.js";
import { tokenContext, AuthContextProvider } from "./assets/files/myContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ProductScreen from "./assets/Screens/ProductScreen.js";
import BottomNavigator from "./assets/components/BottomNavigator.js";

export default function App() {
  const Stack = createNativeStackNavigator();
  const { token, setToken } = useContext(tokenContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 0.99}}>
        <AuthContextProvider>
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
                name="Home"
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
                name="Product"
                component={AddProductScreen}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="Homee" component={HomeScrren} />
              <Stack.Screen
                name="ProductList"
                component={ProductScreen}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
