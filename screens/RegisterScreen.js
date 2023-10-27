// import {
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   TextInput,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Alert
// } from "react-native";
// import { Feather } from '@expo/vector-icons';
// import { Ionicons } from "@expo/vector-icons";
// import React, { useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";

// const RegisterScreen = () => {
//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");
//     const [phone,setPhone] = useState("");
//     const navigation = useNavigation();
//     const register = () => {
//       if(email === "" || password === "" || phone === ""){
//         Alert.alert(
//           "Invalid Details",
//           "Please fill all the details",
//           [
//             { 
//               text: "Cancel",
//               onPress: () => console.log("Cancel Pressed"),
//               style: "cancel"
//             },
//             { text: "OK", onPress: () => console.log("OK Pressed") }
//           ],
//           { cancelable: false }
//         );
//       }
//       createUserWithEmailAndPassword(auth,email,password).then((userCredential) => { //coming from firebase auth
//         console.log("user credential",userCredential);
//         const user = userCredential._tokenResponse.email;
//         const myUserUid = auth.currentUser.uid;

//         setDoc(doc(db,"users",`${myUserUid}`),{
//           email:user,
//           phone:phone
//         })
//       })
//     }
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//         alignItems: "center",
//         padding: 10,
//       }}
//     >
//       <KeyboardAvoidingView>
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 100,
//           }}
//         >
//           <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
//             Register
//           </Text>

//           <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
//             Create a new Account
//           </Text>
//         </View>

//         <View style={{ marginTop: 50 }}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <MaterialCommunityIcons
//               name="email-outline"
//               size={24}
//               color="black"
//             />
//             <TextInput
//               placeholder="Email"
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//               placeholderTextColor="black"
//               style={{
//                 fontSize: email ? 18 : 18,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "gray",
//                 marginLeft: 13,
//                 width: 300,
//                 marginVertical: 10,
//               }}
//             />
//           </View>

//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Ionicons name="key-outline" size={24} color="black" />
//             <TextInput
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               secureTextEntry={true}
//               placeholder="Password"
//               placeholderTextColor="black"
//               style={{
//                 fontSize: password ? 18 : 18,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "gray",
//                 marginLeft: 13,
//                 width: 300,
//                 marginVertical: 20,
//               }}
//             />
//           </View>

//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <Feather name="phone" size={24} color="black" />
//             <TextInput
//               value={phone}
//               onChangeText={(text) => setPhone(text)}
//               placeholder="Phone No"
//               placeholderTextColor="black"
//               style={{
//                 fontSize: password ? 18 : 18,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "gray",
//                 marginLeft: 13,
//                 width: 300,
//                 marginVertical: 10,
//               }}
//             />
//           </View>

//           <Pressable
//           onPress={register}
//             style={{
//               width: 200,
//               backgroundColor: "#318CE7",
//               padding: 15,
//               borderRadius: 7,
//               marginTop: 50,
//               marginLeft: "auto",
//               marginRight: "auto",
//             }}
//           >
//             <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
//               Register
//             </Text>
//           </Pressable>

//           <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: 17,
//                 color: "gray",
//                 fontWeight: "500",
//               }}
//             >
//               Already have a account? Sign in
//             </Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword , getAuth} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("food_finder");

  const auth = getAuth();
  const navigation = useNavigation();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const register = async () => {
    try {
      if (!name || !email || !password) {
        console.error("Please fill in all the required fields.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const db = getDatabase(); // Initialize the Realtime Database

      const userRef = ref(db, `users/${user.uid}`); // Create a reference to the user's data

      // Define the user data to be stored in the Realtime Database
      const userData = {
        email: user.email,
        name: name,
        userType: userType,
      };

      // Set the user data in the Realtime Database
      await set(userRef, userData);
      navigation.replace("Home", { user: userData });

      // Registration was successful
      console.log("User registered successfully:", user);

    } catch (error) {
      // Registration failed, show an error message
      console.error("Error registering user:", error.message);
    }
  };


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "left",
            marginTop: 100,
          }}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 20 }}
          >
          <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text style={{ fontSize: 24, color: "black", fontWeight: "bold" }}>
            Register
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontWeight: "600",
              color: "#B8B8B8",
            }}
          >
            Create account and choose favorite menu
          </Text>
        </View>
        <View
          style={{
            marginTop: 50,
            width: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ alignContent: "left", width: 350,fontSize: 14 }}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
            placeholderTextColor="#B8B8B8"
            style={{
              fontSize: password ? 18 : 18,
              borderColor: "none",
              backgroundColor: "#FAFAFA",
              padding: 10,
              width: "100%",
              color: "#B8B8B8",
              borderRadius: 5,
              marginVertical: 10,
            }}
          />
          <Text style={{ alignContent: "left", width: 350,fontSize: 14 }}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderTextColor="#B8B8B8"
            style={{
              fontSize: password ? 18 : 18,
              borderColor: "none",
              backgroundColor: "#FAFAFA",
              padding: 10,
              width: "100%",
              color: "#B8B8B8",
              borderRadius: 5,
              marginVertical: 10,
            }}
          />
          <Text style={{ alignContent: "left", width: 350 ,fontSize: 14}}>Password</Text>
          <View style={{flexDirection: 'row', 
        alignItems: 'center', }}><TextInput
            // Set secureTextEntry prop to hide  
                    //password when showPassword is false 
                    secureTextEntry={!showPassword} 
                    value={password} 
                    onChangeText={setPassword}  
                    placeholder="Enter Password"
                    placeholderTextColor="#B8B8B8"
            style={{
              fontSize: password ? 18 : 18,
              borderColor: "none",
              backgroundColor: "#FAFAFA",
              padding: 10,
              width: "90%",
              color: "#B8B8B8",
              borderRadius: 5,
              marginVertical: 10,
            }}
          />
          <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={{ postion: 'absolute', backgroundColor:'#FAFAFA',padding: 10, borderRadius: 5}} 
                    onPress={toggleShowPassword} 
                /> 
                </View>
                <Text style={{ alignContent: "left", width: 350, fontSize: 14 }}>
            User Type
          </Text>
          <Picker
            selectedValue={userType}
            onValueChange={(itemValue) => setUserType(itemValue)}
            style={{
              width: "100%",
              borderColor: "none",
              backgroundColor: "#FAFAFA",
              borderRadius: 7,
              marginVertical: 10,
            }}
          >
            <Picker.Item label="Food Finder" value="food_finder" />
            <Picker.Item label="Restaurant Owner" value="restaurant_owner" />
          </Picker>
          <Pressable
            onPress={register}
            style={{
              width: "100%",
              backgroundColor: "#FF724C",
              padding: 15,
              borderRadius: 30,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Already have a account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterScreen;