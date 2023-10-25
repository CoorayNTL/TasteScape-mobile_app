// import React from "react";
// import {
//     View,
//     TextInput,
//     StyleSheet,
//     Pressable,
//     Text,
//     Alert,
// } from "react-native";
// import { addDoc, collection } from "firebase/firestore";
// import db from "../firebase";

// const CreateNewUser = ({ navigation }) => {
//     const defaultURL =
//         "https://i0.wp.com/artvoice.com/wp-content/uploads/2018/03/blank-profile-picture-973460_960_720.png?ssl=1";

//     const [textName, onChangeNameText] = React.useState("");
//     const [textMail, onChangeMailText] = React.useState("");
//     const [textPhone, onChangePhoneText] = React.useState("");
//     const [textURL, onChangeURLText] = React.useState(defaultURL);

//     const AddUser = async () => {
//         if (
//             textName.length === 0 ||
//             textMail.length === 0 ||
//             textPhone.length === 0
//         ) {
//             Alert.alert(
//                 "Validation Error",
//                 "The fields Name, Mail, and Phone are required"
//             );
//         } else {
//             try {
//                 const docRef = collection(db, "Users");
//                 const payload = {
//                     name: textName,
//                     mail: textMail,
//                     phone: textPhone,
//                     pictureURL: textURL,
//                 };
//                 await addDoc(docRef, payload);
//                 navigation.navigate("UsersList");
//             } catch (e) {
//                 alert(e.message);
//             }
//         }
//     };

//     function ButtonSave() {
//         AddUser();
//     }

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.textfield}
//                 onChangeText={onChangeNameText}
//                 value={textName}
//                 placeholder="Name User"
//             />
//             <TextInput
//                 style={styles.textfield}
//                 onChangeText={onChangeMailText}
//                 value={textMail}
//                 placeholder="E-Mail User"
//             />
//             <TextInput
//                 style={styles.textfield}
//                 onChangeText={onChangePhoneText}
//                 value={textPhone}
//                 placeholder="Phone Number"
//             />
//             <TextInput
//                 style={styles.textfield}
//                 onChangeText={onChangeURLText}
//                 placeholder="Profile Picture URL"
//             />
//             <Pressable style={styles.buttonSave} onPress={() => ButtonSave()}>
//                 <Text style={styles.textButton}>SAVE USER</Text>
//             </Pressable>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         margin: 30,
//     },
//     textfield: {
//         marginBottom: 10,
//         padding: 10,
//         fontSize: 15,
//         color: "#000000",
//         backgroundColor: "#e0e0e0",
//         borderRadius: 5,
//     },
//     buttonSave: {
//         marginVertical: 30,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         borderRadius: 4,
//         elevation: 3,
//         backgroundColor: "#1ecfea",
//     },
//     textButton: {
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: "bold",
//         letterSpacing: 0.25,
//         color: "white",
//     },
// });

// export default CreateNewUser;

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Pressable,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddDish = ({ navigation }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [topping, setTopping] = useState("");
    const [preparationTime, setPreparationTime] = useState("");
    const [price, setPrice] = useState("");
    const [dishImage, setDishImage] = useState(null);

    const handleImageUpload = () => {
        const options = {
            title: "Select Dish Image",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                setDishImage({ uri: response.uri });
            }
        });
    };

    const addDishToFirebase = async () => {
        if (
            !name ||
            !type ||
            !description ||
            !topping ||
            !preparationTime ||
            !price
        ) {
            Alert.alert("Please fill all the fields");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "dishes"), {
                name,
                type,
                description,
                topping,
                preparationTime,
                price,
            });
            Alert.alert("Dish added successfully");
            navigation.navigate("Dishes");
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Error adding document");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Dish</Text>
            <TouchableOpacity onPress={handleImageUpload}>
                {dishImage ? (
                    <Image
                        source={{ uri: dishImage.uri }}
                        style={styles.dishImage}
                    />
                ) : (
                    <Text style={styles.uploadText}>Upload Dish Image</Text>
                )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Type</Text>
                <TextInput
                    style={styles.input}
                    value={type}
                    onChangeText={setType}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Topping (comma-separated)</Text>
                <TextInput
                    style={styles.input}
                    value={topping}
                    onChangeText={setTopping}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Price</Text>
                <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                    Preparation Time (minutes)
                </Text>
                <TextInput
                    style={styles.input}
                    value={preparationTime}
                    onChangeText={setPreparationTime}
                    keyboardType="numeric"
                />
            </View>
            <Pressable style={styles.button} onPress={addDishToFirebase}>
                <Text style={styles.text}>Add Dish</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
    dishImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    uploadText: {
        fontSize: 16,
        color: "#FF724C",
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: "#FF724C",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});

export default AddDish;

