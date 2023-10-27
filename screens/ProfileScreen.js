import { StyleSheet, Text, View,SafeAreaView,Pressable, Image } from 'react-native'
import { auth,db } from '../firebase'
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      // Fetch user data from Firestore using the user's UID
      const getUserData = async () => {
        try {
          const docRef = await db.collection('users').doc(user.uid).get();
          if (docRef.exists) {
            const userData = docRef.data();
            console.log(userData);
            // Assuming you have a 'name' field in your Firestore document
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      };

      getUserData();
    }
  }, [user]);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <View style={{width: '100%', borderBottomColor:'#E8E8E8', borderBottomWidth:1, alignItems: 'center',paddingBottom:5}}>
        <Text style={{fontWeight:600, fontSize: 20}}>Profile</Text>
      </View>
      <View style={{padding:10}}>
      <Image
                    style={{ width: 80, height: 80, borderRadius: 40 }}
                    source={{
                        uri: "https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1060&t=st=1696350856~exp=1696351456~hmac=f4a2d46f5cde967eb43b10409ba53dd0fbbc50dd04d619be059f25f00fbdfaa0",
                    }}
                />
      </View>
      <Pressable style={{marginVertical:10}}>
        <Text style={{fontSize:16}}>welcome {userName}</Text>
      </Pressable>

      <Pressable onPress={signOutUser} style={{ paddingHorizontal:6, padding:2, borderColor:'#FF724C', borderWidth:1}}>
          <Text style={{color:'#FF724C'}}>Sign Out</Text>
      </Pressable>
      <Pressable style={{marginVertical:10}}>
        <Text style={{fontSize:16}}>Rate us</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})