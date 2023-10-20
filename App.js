// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import StackNavigator from "./StackNavigator";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./screens/RestaurantOwner/navigation/Tab";
import Chat from "./screens/RestaurantOwner/Chat";

export default function App() {
  return (
    <Provider store={store}>
   <NavigationContainer>
    <Tabs/>
   </NavigationContainer>
   </Provider>
  );
}


