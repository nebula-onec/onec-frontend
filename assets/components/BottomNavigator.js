import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import HomeScrren from "../files/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import ProductScreen from "../Screens/ProductScreen";
import AccountScreen from "../Screens/AccountScreen";

const Tab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {overflow: 'hidden'},
          }}
        >
          <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon:({})=>(<MaterialCommunityIcons name="home" size={24} color="black" />)
          }}
          name="Home" component={HomeScrren} />
          <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon:({})=>(<MaterialCommunityIcons name="format-list-bulleted" size={24} color="black" />)
          }}
          name="Products" component={ProductScreen}/>
          <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon:({})=>(<MaterialCommunityIcons name="account" size={24} color="black" />)
          }}
          name="Account" component={AccountScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

export default BottomNavigator;
