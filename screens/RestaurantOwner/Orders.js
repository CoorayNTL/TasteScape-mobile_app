import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useFocusEffect, useNavigation } from "@react-navigation/native"; // Import the navigation hook

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation(); // Initialize the navigation hook

 
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const orderList = [];

        ordersSnapshot.forEach((doc) => {
          const orderData = {
            id: doc.id,
            ...doc.data(),
          };

          // Convert the timestamp to a Date object
          const orderTime = orderData.orderTime.toDate();
          const currentTime = new Date();
          const timeDifference = Math.floor((currentTime - orderTime) / (1000 * 60)); // in minutes

          // Add the calculated time ago to the order data
          orderData.timeAgo = timeDifference;

          orderList.push(orderData);
        });

        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    useFocusEffect(
      React.useCallback(() => {
        fetchOrders();
      }, [])
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Orders</Text>
      {orders.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            // Navigate to the OrderOverview screen when an order is clicked
            navigation.navigate("orderOverview", { order: item });
          }}
        >
          <View style={styles.orderItem}>
            <Text style={styles.dishName}>{item.DishName}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.timeAgo}>Ordered {item.timeAgo} minutes ago</Text>
            {/* Add more order details here */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
  },
  title: {
    
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
  },
  timeAgo: {
    fontSize: 14,
    color: "#666",
  },
  // Add more styles as needed
});

export default OrderScreen;
