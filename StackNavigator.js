import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import CartScreen from "./screens/CartScreen";
import LoadingScreen from "./screens/LoadingScreen";
import OrderScreen from "./screens/OrderScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReviewFoodScreen from "./screens/ReviewFoodScreen1.0";
import NewFoodListView from "./screens/NewFoodListView1.0";
import UsersList from "./screens/UsersList";
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import ManageUserFeedBack from "./screens/ManageUserFeedBack1.0";
import ReviewView from "./screens/FeedbackOverView";
import FeedbackViewList from "./screens/FeedbackViewList";
import UpdateFeedBack from "./screens/UpdateFeedback";

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Order"
                    component={OrderScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Review"
                    component={ReviewFoodScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NewFoodListView"
                    component={NewFoodListView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="UsersList" component={UsersList} />
                <Stack.Screen
                    name="CreateUserScreen"
                    component={CreateUserScreen}
                />
                <Stack.Screen
                    name="UserDetailScreen"
                    component={UserDetailScreen}
                />
                <Stack.Screen
                    name="ManageUserFeedBack"
                    component={ManageUserFeedBack}
                />
                <Stack.Screen name="ReviewView" component={ReviewView} />
                <Stack.Screen
                    name="FeedbackViewList"
                    component={FeedbackViewList}
                />
                <Stack.Screen name="UpdateFeedBack" component={UpdateFeedBack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});
