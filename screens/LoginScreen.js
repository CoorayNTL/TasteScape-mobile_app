// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   TextInput,
//   Pressable,
//   ActivityIndicator
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [loading,setLoading] = useState(false);
//   const [password, setPassword] = useState("");
//   const navigation = useNavigation();

//   useEffect(() => {
//     setLoading(true);
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if(!authUser){
//         setLoading(false);
//       }
//       if(authUser){
//         navigation.replace("Home");
//       }
//     });

//     return unsubscribe;
//   },[])
  
//   const login = () => {
//     signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
//       console.log("user credential",userCredential);
//       const user = userCredential.user;
//       console.log("user details",user)
//     })
//   }

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//         alignItems: "center",
//         padding: 10,
//       }}
//     >
//       {loading ? (
//         <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
//           <Text style={{marginRight:10}}>Loading</Text>
//           <ActivityIndicator size="large" color="red"/>
//         </View>
//       ) : (
//         <KeyboardAvoidingView>
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 100,
//           }}
//         >
//           <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
//             Sign In
//           </Text>

//           <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
//             Sign In to your account
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

//           <Pressable
//           onPress={login}
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
//               Login
//             </Text>
//           </Pressable>

//           <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: 17,
//                 color: "gray",
//                 fontWeight: "500",
//               }}
//             >
//               Don't have a account? Sign Up
//             </Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//       )}
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});


import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false); 
  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
};
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(!authUser){
        setLoading(false);
      }
      // if(authUser){
      //   navigation.replace("Owner");
      // }
    });

    return unsubscribe;
  },[])
  
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Fetch user data from Realtime Database based on user's UID
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
  
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          
             console.log(userData.userType);
            // Check user type and navigate accordingly
           
              navigation.replace("Home", { user: userData });
          
        });
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
      });
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
      {loading ? (
        <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1}}>
          <Text style={{marginRight:10}}>Loading</Text>
          <ActivityIndicator size="large" color="red"/>
        </View>
      ) : (
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
          Welcome Back 👋
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600", color: '#A6A6A6'}}>
          Sign to your account
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
            // password when showPassword is false 
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

          <Pressable
            onPress={login}
            style={{
              width: "100%",
              backgroundColor: "#FF724C",
              padding: 12,
              borderRadius: 30,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
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
              Don’t have an account?  Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
