import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Constants } from "expo-constants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useContext, useState } from "react";

import SplashScreen from "./assets/files/SplashScreen.js";
import LoginScreen from "./assets/files/LoginScreen.js";

import { tokenContext, AuthContextProvider } from "./assets/files/myContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNavigator from "./assets/components/BottomNavigator.js";

export default function App() {
  const Stack = createNativeStackNavigator();
  //const plat = Constants.pla
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
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
            </Stack.Navigator>
          </NavigationContainer>
        </AuthContextProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
