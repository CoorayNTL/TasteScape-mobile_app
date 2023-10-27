import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import your icon library

import ChatScreen from "../AddDish";
import OrdersScreen from "./OrderStack";
import ProfileScreen from "../Account";
import MenuItem from "../../../components/MenuItem";
import MenuScreen from "./MenuStack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          paddingTop: 20,
          backgroundColor: "#FF724C", // Background color
          borderRadius: 15, // Rounded corners
          shadowColor: "#A6A6A6", // Shadow color
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        tabStyle: {
          backgroundColor: "transparent", // Make tab backgrounds transparent
        },
        activeTintColor: "#FF724C", // Active icon color
        // Remove showLabel or set it to true to display labels
        // showLabel: true,
      }}
    >
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" size={24} color={color} />
          ),
          headerShown: false, 
          headerTitle: null, // Hide the screen name in the top bar
          tabBarLabel: "Chat", // Display label below the icon
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" size={24} color={color} />
          ),
          headerShown: false, 
          headerTitle: null, // Hide the screen name in the top bar
          tabBarLabel: "Menu",
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="receipt" size={24} color={color} />
          ),
          headerShown: false, 
          headerTitle: null, // Hide the screen name in the top bar
          tabBarLabel: "Orders",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          headerShown: false, 
          headerTitle: null, // Hide the screen name in the top bar
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
