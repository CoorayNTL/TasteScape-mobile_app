import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "@react-navigation/native";


import MenuScreen from "../Menu";
import AddDish from "../AddDish";
import DishOverview from "../DishOverview";
import UpdateDish from "../UpdateDish";

const Stack = createStackNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="AddDish" component={AddDish} />
      <Stack.Screen name="DishOverview" component={DishOverview} />
      <Stack.Screen name="UpdateDish" component={UpdateDish} />
    </Stack.Navigator>
  );
};
export default MenuStack;