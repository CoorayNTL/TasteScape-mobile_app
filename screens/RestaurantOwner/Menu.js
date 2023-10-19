import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Pressable } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import image from '../../assets/image5.jpg';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const Menu = ({ navigation }) => {
  const [dishes, setDishes] = useState([]);

  // Fetch dishes from Firestore
  const fetchDishes = async () => {
    try {
      const dishesCollection = collection(db, "dishes");
      const dishesSnapshot = await getDocs(dishesCollection);
      const dishList = [];

      dishesSnapshot.forEach((doc) => {
        dishList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setDishes(dishList);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  };

  // Use the useFocusEffect hook to refresh data when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchDishes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Your Menu</Text>
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          <FlatList
            data={dishes} // Use the dishes retrieved from Firestore
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  // Navigate to the DishOverview screen when a dish is clicked
                  navigation.navigate("DishOverview", { dish: item });
                }}
              >
                <View style={styles.menuItem}>
                  <Image source={image} style={styles.dishImage} />
                  <View>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.dishPrice}>{item.preparationTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <Pressable style={styles.button} onPress={() => navigation.navigate("AddDish")}>
          <Text style={styles.text}>Add Dish</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    padding: 10,
  },
  centeredContent: {
    width: "100%",
    maxWidth: 400, // Adjust this value as needed
  },
  listContainer: {
    maxHeight: 400, // Set a fixed height for the list
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  dishImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10, // Rounded corners for the dish image
  },
  dishName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dishPrice: {
    fontSize: 14,
    color: "#FF724C", // Set the font color to #FF724C
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

export default Menu;
