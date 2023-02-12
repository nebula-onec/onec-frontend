import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScrren from "../files/HomeScreen";
import ProductScreen from "../Screens/ProductScreen";
import AccountScreen from "../Screens/AccountScreen";
import OrderScreen from "../Screens/OrderScreen";
import values from "../config/values";

const Tab = createBottomTabNavigator();

function BottomNavigator(props) {
  return (
    // <NavigationContainer independent={true}>
    <SafeAreaView style={{ flex: 1, backgroundColor: values.primary_background}} forceInset={{top: 'never'}}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { overflow: "hidden" },
        }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({}) => (
              <MaterialCommunityIcons name="home" size={24} color="black" />
            ),
          }}
          name="Home"
          component={HomeScrren}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({}) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={24}
                color="black"
              />
            ),
          }}
          name="Products"
          component={ProductScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({}) => (
              <MaterialCommunityIcons name="cart" size={24} color="black" />
            ),
          }}
          name="Orders"
          component={OrderScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({}) => (
              <MaterialCommunityIcons name="account" size={24} color="black" />
            ),
          }}
          name="Account"
          component={AccountScreen}
        />
      </Tab.Navigator>
      </SafeAreaView>
    // </NavigationContainer>
  );
}

export default BottomNavigator;
