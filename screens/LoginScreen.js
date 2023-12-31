import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(null);


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        try {
          console.log(authUser.uid)
          const usersCollection = collection(db, "users");
           
          const q = query(usersCollection, where("uid", "==", authUser.uid));
          const userDocSnap = await getDocs(q);
  
          if (!userDocSnap.empty) {
            userDocSnap.forEach((doc) => {
              const userData = doc.data();
              const userType = userData.userType;
  
              if (userType === "restaurant_owner") {
                navigation.navigate("ResturentHome");
              } else {
                navigation.navigate("Home");
              }
            });
          } else {
            navigation.navigate("Home");
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore: ", error);
        }
      }
    });
  
    return unsubscribe;
  }, []);
  
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
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
