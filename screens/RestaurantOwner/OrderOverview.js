import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable, FlatList, ScrollView } from "react-native";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp.toDate());
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const orderStages = ["Ready", "Kitchen", "On Fire", "Garnish", "Ready to Take"];

const updateOrderStatuss = async (orderId, newStatus) => {
  const orderRef = doc(db, "orders", orderId);

  try {
    await updateDoc(orderRef, { orderStatus: newStatus });
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

const OrdersOverview = ({ route, navigation }) => {
  const { order } = route.params;
  const [preparationTime, setPreparationTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [acceptedTime, setAcceptedTime] = useState(null); // Initialize acceptedTime as null
  const [orderStage, setOrderStage] = useState(""); // Initial order stage
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAcceptOrder = async () => {
    // Get the Firestore server timestamp
    const currentTime = serverTimestamp();
  
    // Update the order status and accepted time
    await updateOrderStatus(order.id, "accepted", currentTime);
  };

  const handleDeclineOrder = () => {
    updateOrderStatus(order.id, "declined", false);
  };

  const updateOrderStatus = async (orderId, newStatus, acceptedTime) => {
    const orderRef = doc(db, "orders", orderId);
  
    try {
      await updateDoc(orderRef, { orderStatus: newStatus, acceptedTime });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    if (order.acceptedTime) {
      // Calculate remaining time based on accepted time
      const currentTime = new Date().getTime();
      const acceptedTimestamp = order.acceptedTime.toMillis();
      const elapsedTime = currentTime - acceptedTimestamp;
      const preparationTimeMilliseconds = preparationTime;

      if (preparationTimeMilliseconds > elapsedTime) {
        setRemainingTime(preparationTimeMilliseconds - elapsedTime);
      } else {
        setRemainingTime(0);
      }
    }
  }, [order.acceptedTime, preparationTime]);

  useEffect(() => {
    if (order.orderStatus === "accepted" && order.dishId) {
      const fetchPreparationTime = async () => {
        const dishId = order.dishId;
        if (dishId) {
          const dishRef = doc(db, "dishes", dishId);
          try {
            const dishSnapshot = await getDoc(dishRef);
            if (dishSnapshot.exists()) {
              const dishData = dishSnapshot.data();
              if (dishData.preparationTime) {
                const preparationTimeMilliseconds = dishData.preparationTime * 60 * 1000;
                setPreparationTime(preparationTimeMilliseconds);
              }
            }
          } catch (error) {
            console.error("Error fetching preparation time:", error);
          }
        }
      };

      fetchPreparationTime();
    }
  }, [order.orderStatus, order.dishId]);

  useEffect(() => {
    const fetchDishPrice = async () => {
      if (order.dishId) {
        const dishRef = doc(db, "dishes", order.dishId);
        try {
          const dishSnapshot = await getDoc(dishRef);
          if (dishSnapshot.exists()) {
            const dishData = dishSnapshot.data();
            if (dishData.price) {
              const price = dishData.price;
              setTotalPrice(price * order.quantity);
            }
          }
        } catch (error) {
          console.error("Error fetching dish information:", error);
        }
      }
    };

    // Call the async function to fetch and calculate the total price
    fetchDishPrice();
  }, [order.dishId, order.quantity]);

  // Start the countdown timer
  useEffect(() => {

  

    const intervalId = setInterval(() => {
      if (remainingTime <= 0) {
        setRemainingTime(0);
        clearInterval(intervalId);
      } else {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = ((remainingTime % 60000) / 1000).toFixed(0);
        setRemainingTime(remainingTime - 1000);
      }
    }, 1000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, [remainingTime]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Order Overview</Text>
        <Text style={styles.label}>Dish Name:</Text>
        <Text style={styles.info}>{order.DishName}</Text>
        <Text style={styles.label}>Quantity:</Text>
        <Text style={styles.info}>{order.quantity}</Text>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.info}>${totalPrice}</Text>
        <Text style={styles.label}>Ordered Time:</Text>
        <Text style={styles.info}>{formatTimestamp(order.orderTime)}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.info}>{order.description}</Text>
        <Text style={styles.label}>Toppings:</Text>
        <Text style={styles.info}>
          {order.toppings ? order.toppings.join(", ") : "No toppings"}
        </Text>
        {order.orderStatus !== "pending" && (
          <View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Preparation Time (minutes):</Text>
              <Text style={styles.info}>{preparationTime / (60 * 1000)} minutes</Text>
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Order Stage:</Text>
              <FlatList
                data={["Ready", "Kitchen", "On Fire", "Garnish", "Ready to Take"]}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    style={[
                      styles.dropdownItem,
                      orderStage === item && styles.selectedItem,
                    ]}
                    onPress={() => {
                      setOrderStage(item);
                      updateOrderStatuss(order.id, item); // Update the order status
                    }}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        )}

        {order.orderStatus === "pending" ? null : ( // Conditionally render the countdown
          <Text style={styles.countdown}>{remainingTime <= 0 ? "Ready!" : `${Math.floor(remainingTime / 60000)}:${((remainingTime % 60000) / 1000).toFixed(0)}`}</Text>
        )}
      </View>

      <Pressable style={styles.button1} onPress={handleAcceptOrder}>
        <Text style={styles.text}>Accept Order</Text>
      </Pressable>

      <Pressable style={styles.button2} onPress={handleDeclineOrder}>
        <Text style={styles.text}>Decline Order</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F7F7F7", // Background color
    padding: 20,
    paddingTop: 40, // Additional padding at the top
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40, // Additional padding at the top
    backgroundColor: "#F7F7F7", // Background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#A6A6A6",
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#FF4C4C",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedItem: {
    backgroundColor: "#FF724C",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  countdown: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
});

export default OrdersOverview;