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
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
}; 
  const navigation = useNavigation();
  const register = () => {
    if (email === "" || password === "" || name === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        //coming from firebase auth
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          name: name,
        });
      }
    );
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

          <Pressable
            onPress={register}
            style={{
              width: "100%",
              backgroundColor: "#FF724C",
              padding: 15,
              borderRadius: 7,
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

const styles = StyleSheet.create({});
