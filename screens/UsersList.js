import React from 'react'
import { FlatList, View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, QuerySnapshot, setDoc } from 'firebase/firestore';
import db from '../firebase'
import emptyList from '../images/ext/rolled_eyes.png'


export default function Home({navigation}) {

    const [Users, setUsers] = useState([])

    useEffect(async () => {
        const q = collection(db, "Users");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const Users = [];
            querySnapshot.forEach((doc) => {
                Users.push({
                    id: doc.id,
                    name: doc.data().name,
                    mail: doc.data().mail,
                    phone: doc.data().phone,
                    pictureURL: doc.data().pictureURL
                });
            });
            setUsers(Users);
        });
        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <View>
            <Pressable
                style={styles.buttonAdd}
                onPress={() => navigation.navigate('CreateUserScreen')}>
                    <Text style={styles.textButton}>CREATE USER</Text>
                </Pressable>
            <FlatList 
                style={{height: '100%'}}
                data={Users}
                numColumns={1}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{fontWeight: '400'}}>Nothing to see here :/</Text>
                        <Image source={emptyList} style={{ width: 100, height: 100, marginTop: 30}} />
                    </View>
                }
                renderItem={({item}) => (
                    <Pressable 
                        style={styles.container} 
                        onPress={() => navigation.navigate('UserDetailScreen', {item})}>
                        <View style={styles.innerContainer}>
                            <Image 
                                source={{uri: item.pictureURL}}
                                style={styles.imagePre}/>
                        </View>
                        <View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemMail}>{item.mail}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    empty: {
        padding: 100,
        display: 'flex',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonAdd: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        padding: 20,
        marginBottom: 20,
        backgroundColor: '#1ecfea',
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    imagePre: {
        width: 50, 
        height: 50, 
        margin: 5,
        resizeMode: 'contain', 
        borderRadius: 50/2,
        marginRight: 20
    },
    itemName: {
        fontWeight: 'bold'
    },
    itemMail: {
        fontWeight: '300'
    }
});
  