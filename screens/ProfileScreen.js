import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Alert } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, remove } from 'firebase/database';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const db = getDatabase();

  const deleteUser = () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Delete user data from the real-time database
            const currentUser = auth.currentUser;
            if (currentUser) {
              const userRef = ref(db, `users/${currentUser.uid}`);
              remove(userRef)
                .then(() => {
                  // Delete the user from authentication
                  currentUser.delete()
                    .then(() => {
                      console.log('User deleted successfully');
                      // Navigate to the register screen
                      navigation.replace('Register');
                    })
                    .catch((error) => {
                      console.log(error.message);
                    });
                })
                .catch((error) => {
                  console.log(error.message);
                });
            } else {
              console.log('Current user is null');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

 

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
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: "#fffff" }}>
      <Text style={{fontSize:24}}>Profile</Text>
      <Image
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                    source={{
                        uri: "https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1060&t=st=1696350856~exp=1696351456~hmac=f4a2d46f5cde967eb43b10409ba53dd0fbbc50dd04d619be059f25f00fbdfaa0",
                    }}
                />
      <Text style={{fontSize:20}}>{userTypeTitle}</Text>
        <Text style={{fontSize:16}}>Welcome {user.name} 👋</Text>
        <Text style={{fontSize:16}}> Email: {user.email}</Text>

      <Pressable  style={{paddingVertical:5, paddingHorizontal:10, borderRadius: 30,borderWidth:1, borderColor:'#FF724C', margin:5}} onPress={signOutUser}>
        <Text style={{fontSize:16}}>Sign Out</Text>
      </Pressable>
      <Pressable style={{paddingVertical:5, paddingHorizontal:10, borderWidth:1, borderColor:'#FF724C', margin:5, width:'100%'}}>
  <Text style={{fontSize:16}}>
    Add Upload
  </Text>
</Pressable>
<View>
      <Pressable style={{
        width: "100%",
        backgroundColor: "#FF724C",
        padding: 15,
        borderRadius: 30,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
      }} onPress={() => navigation.navigate("UpdateProfile", { user: user })}>
        <Text style={{ fontSize: 16, textAlign: "center", color: "white" }}>Update Profile</Text>
      </Pressable>

      <Pressable style={{
        width: "100%",
        backgroundColor: "#FF724C",
        padding: 15,
        borderRadius: 30,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
      }} onPress={deleteUser}>
        <Text style={{ fontSize: 16, textAlign: "center", color: "white" }}>Delete User</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
