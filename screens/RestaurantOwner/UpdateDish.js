import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, Pressable } from "react-native";
import ImagePicker from 'react-native-image-picker';
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';

const UpdateDish = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [topping, setTopping] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [price, setPrice] = useState("");
  const [dishImage, setDishImage] = useState(null);

  const { dish } = route.params; // Get the dish object passed from the Menu screen

  useEffect(() => {
    // Populate input fields with the existing dish data
    setName(dish.name);
    setType(dish.type);
    setDescription(dish.description);
    setTopping(dish.topping.join(", "));
    setPreparationTime(dish.preparationTime);
    setPrice(dish.price);
    // You can also set the dishImage if it exists in the dish object
    if (dish.image) {
      setDishImage({ uri: dish.image });
    }
  }, [dish]);

  const handleImageUpload = () => {
    const options = {
      title: 'Select Dish Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setDishImage({ uri: response.uri });
      }
    });
  };

  const updateDishInFirebase = async () => {
    // Validate input fields
    if (!name || !type || !description || !topping || !price || !preparationTime) {
      Alert.alert("Validation Error", "Please fill in all fields before updating the dish.");
      return;
    }

    try {
      const dishesCollection = collection(db, "dishes");
      const dishRef = doc(dishesCollection, dish.id);
      const updatedDishData = {
        name: name,
        type: type,
        description: description,
        topping: topping.split(",").map((t) => t.trim()),
        preparationTime: preparationTime,
        price: price,
        image: dishImage ? dishImage.uri : null,
      };

      await updateDoc(dishRef, updatedDishData);
      console.log("Dish updated successfully");

      // Navigate back to the Menu screen
      navigation.navigate("Menu");
    } catch (error) {
      console.error("Error updating dish: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Dish</Text>
      <TouchableOpacity onPress={handleImageUpload}>
        {dishImage ? (
          <Image source={{ uri: dishImage.uri }} style={styles.dishImage} />
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
        <Text style={styles.inputLabel}>Preparation Time (minutes)</Text>
        <TextInput
          style={styles.input}
          value={preparationTime}
          onChangeText={setPreparationTime}
          keyboardType="numeric"
        />
      </View>
      <Pressable style={styles.button} onPress={updateDishInFirebase}>
        <Text style={styles.text}>Update Dish</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#FF724C',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default UpdateDish;
