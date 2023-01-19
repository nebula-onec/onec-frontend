import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScrren from "../files/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProductScreen from "../Screens/ProductScreen";
import LoginScreen from "../files/LoginScreen.js";

const Tab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
          options={{
            headerShown: false,
          }}
          name="Home" component={HomeScrren} />
          <Tab.Screen 
          options={{
            headerShown: false,
          }}
          name="Products" component={ProductScreen}/>
          <Tab.Screen 
          options={{
            headerShown: false,
          }}
          name="Login" component={LoginScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default BottomNavigator;
