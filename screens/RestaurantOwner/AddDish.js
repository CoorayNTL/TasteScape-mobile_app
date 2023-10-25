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
import ImagePicker from "react-native-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

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
