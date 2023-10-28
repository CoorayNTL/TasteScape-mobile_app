import Account from "../Account";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Account" component={Account} options={{
          headerShown: false, // Hide the screen name in the top bar
        }} />
  
     
       
    </Stack.Navigator>
  );
};
export default AccountStack;