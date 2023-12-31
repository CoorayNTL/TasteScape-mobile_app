import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "@react-navigation/native";


import MenuScreen from "../Menu";
import AddDish from "../AddDish";
import DishOverview from "../DishOverview";
import UpdateDish from "../UpdateDish";
import OrdersOverview from "../OrderOverview";

const Stack = createStackNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={MenuScreen} options={{
          headerShown: false, // Hide the screen name in the top bar
        }} />
      <Stack.Screen name="AddDish" component={AddDish} options={{
          headerShown: false, // Hide the screen name in the top bar
        }} />
      <Stack.Screen name="DishOverview" component={DishOverview} options={{
          headerShown: false, // Hide the screen name in the top bar
        }} />
      <Stack.Screen name="UpdateDish" component={UpdateDish} options={{
          headerShown: false, // Hide the screen name in the top bar
        }}/>
       
    </Stack.Navigator>
  );
};
export default MenuStack;