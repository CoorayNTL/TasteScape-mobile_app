import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  console.log(user.name);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userTypeTitle =
    user.userType === 'restaurant_owner' ? 'Restaurant Owner' : 'Food Finder';

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable style={{ marginVertical: 10 }}>
      <Text>{userTypeTitle}</Text>
        <Text>Welcome {user.email}</Text>
        <Text>{user.name}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
