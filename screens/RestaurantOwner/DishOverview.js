import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import image from '../../assets/image5.jpg';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
// Import Firestore functions

const DishOverview = ({ route, navigation }) => {
  // Extract dish details from the route params
  const { dish } = route.params;

  const handleDeleteDish = async () => {
    const firestore = getFirestore();
    const dishDocRef = doc(firestore, "dishes", dish.id); // Specify the collection and document ID

    try {
      await deleteDoc(dishDocRef);
      console.log('Dish deleted successfully');
      navigation.navigate("Menu")
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.dishImage} />
      <Text style={styles.dishName}>{dish.name}</Text>
      <Text style={styles.preparationTime}>Preparation Time: {dish.preparationTime}</Text>
      <Text style={styles.toppings}>
  Toppings: {dish.toppings ? dish.toppings.join(", ") : "No toppings"}
</Text>

<Button
  title="Update Dish"
  color="#FF724C"
  onPress={() => {
    navigation.navigate("UpdateDish", { dish });
  }}
/>

      <Button
        title="Delete Dish"
        color="#FF0000"
        onPress={handleDeleteDish} // Call the delete function
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  dishImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  preparationTime: {
    fontSize: 16,
    marginBottom: 10,
  },
  toppings: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DishOverview;
