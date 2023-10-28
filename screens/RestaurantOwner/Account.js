import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { auth, db } from "../../firebase"; // Ensure you've imported db from Firebase

const Account = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  const fetchUserData = async (uid) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", uid);

    try {
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid); // Fetch additional user data based on UID
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello {userData?.name}</Text>
      {/* Add button for create */}
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.buttonText}>Publish Your Ad</Text>
      </TouchableOpacity>
      {/* Sign Out button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    createButton: {
      backgroundColor: '#FF724C',
      padding: 15,
      borderRadius: 30,
      marginTop: 20,
      width: 250, // Set width to ensure uniform size
      height: 50, // Set height to ensure uniform size
      alignItems: 'center', // Center text horizontally
      justifyContent: 'center', // Center text vertically
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    signOutButton: {
      backgroundColor: "gray",
      padding: 15,
      borderRadius: 30,
      marginTop: 20,
      width: 250, // Set width to ensure uniform size
      height: 50, // Set height to ensure uniform size
      alignItems: 'center', // Center text horizontally
      justifyContent: 'center', // Center text vertically
    },
    signOutButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    // Add more styles for other UI components
  });

export default Account;
