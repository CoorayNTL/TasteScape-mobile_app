import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, update } from "firebase/database";
import { updateEmail, signOut } from "firebase/auth";

const UpdateProfileScreen = ({ route }) => {
  const { user } = route.params;
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const db = getDatabase();
  const navigation = useNavigation();
  const userRef = ref(db, `users/${user.uid}`);

  const handleUpdateProfile = () => {
    const currentUser = auth.currentUser;

    // Update user data in the real-time database
    if (currentUser) {
      // Update user data in the real-time database using the retrieved user's ID
      const userRef = ref(db, `users/${currentUser.uid}`);
      update(userRef, {
        name: newName,
        email: newEmail,
      })
        .then(() => {
          // Update email in Firebase Authentication
          updateEmail(currentUser, newEmail)
            .then(() => {
              Alert.alert("Success", "Profile and email updated successfully.");
              // Navigate back to the ProfileScreen after successful update
              signOut(auth)
                .then(() => {
                  navigation.replace("Login");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              // Handle email update errors
              Alert.alert("Error", error.message);
            });
        })
        .catch((error) => {
          // Handle real-time database update errors
          Alert.alert("Error", error.message);
        });
    } else {
      // Handle the case when the currentUser is not available (user is not authenticated)
      Alert.alert("Error", "User not authenticated. Please sign in.");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 24 }}>Update Profile</Text>
      <Image
        style={{ width: 60, height: 60, borderRadius: 30 }}
        source={{
          uri: "https://your-profile-image-url.jpg", // Update with the user's profile image URL
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
        keyboardType="email-address"
      />
      <Pressable
        style={{
          width: "50%",
          backgroundColor: "#FF724C",
          padding: 15,
          borderRadius: 30,
          marginTop: 20,
        }}
        onPress={handleUpdateProfile}
      >
        <Text style={{ fontSize: 16, textAlign: "center", color: "white" }}>
          Update
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

// The ProfileScreen component remains the same as provided in the previous response.
// Ensure you have imported the necessary modules and dependencies for Firebase and React Navigation in your actual code.
