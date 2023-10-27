import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { db } from "./../firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("food_finder");
  const [premium, setPremium] = useState(false);

  const auth = getAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save additional user details to Firestore with the UID as the document ID
      const userRef = doc(db, "users", user.uid); // Use the UID as the document ID
      const newUser = {
        uid: user.uid,
        name: name,
        email: email,
        userType: userType,
        premium: premium,
        // Add other user details as needed
      };
  
      // Set the user details to Firestore with the provided document ID
      await setDoc(userRef, newUser);
  
      // You can optionally navigate to another screen upon successful registration
      // navigation.navigate("HomeScreen");
    } catch (error) {
      // Handle registration or Firestore data saving errors here
      console.error("Error registering user:", error);
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
          <Text style={{ alignContent: "left", width: 350, fontSize: 14 }}>
            Name
          </Text>
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

          <Text style={{ alignContent: "left", width: 350, fontSize: 14 }}>
            Email
          </Text>
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

          <Text style={{ alignContent: "left", width: 350, fontSize: 14 }}>
            Password
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
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
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#aaa"
              style={{
                postion: "absolute",
                backgroundColor: "#FAFAFA",
                padding: 10,
                borderRadius: 5,
              }}
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
            onPress={handleRegister}
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
