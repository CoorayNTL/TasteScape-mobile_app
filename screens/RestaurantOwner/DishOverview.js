import React from "react";
import { View, Text, Image, Button, StyleSheet, Pressable } from "react-native";
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
  Toppings: {dish.topping ? dish.topping.join(", ") : ""}
</Text>


<Pressable style={styles.button1} onPress={() => navigation.navigate("UpdateDish", { dish })}>
  <Text style={styles.text}>Update Dish</Text>
</Pressable>


    <Pressable style={styles.button2} onPress={handleDeleteDish }>
      <Text style={styles.text}>Delete Dish</Text>
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 50
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
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#FF724C',
  },
  button2: {
    paddingtop:10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: '#gray',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});

export default DishOverview;
