import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "@react-navigation/native";


import MenuScreen from "../Menu";
import AddDish from "../AddDish";
import DishOverview from "../DishOverview";
import UpdateDish from "../UpdateDish";
import OrdersOverview from "../OrderOverview";
import OrdersScreen from "../Orders";
const Stack = createStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="Order">
      
      <Stack.Screen name="Order" component={OrdersScreen} options={{
          headerShown: false, // Hide the screen name in the top bar
        }}/>
        <Stack.Screen name="orderOverview" component={OrdersOverview} options={{
          headerShown: false, // Hide the screen name in the top bar
        }}/>
       
    </Stack.Navigator>
  );
};
export default OrderStack;