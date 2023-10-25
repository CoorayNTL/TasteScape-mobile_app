import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useFocusEffect } from "@react-navigation/native";

const FeedbackViewList = ({ navigation }) => {
  const [feedback, setFeedback] = useState([]);

  const fetchFeedback = async () => {
    try {
      const feedbackCollection = collection(db, "reviews");
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = [];

      feedbackSnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        feedbackList.push({
          id,
          feedback: data.feedback,
          rating: data.rating,
          food : data.food,
          images: data.images || [],
        });
      });

      setFeedback(feedbackList);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFeedback();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Feedback</Text>
      <ScrollView>
        {feedback.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              navigation.navigate("ReviewView", { feedback: item });
            }}
          >
            <View style={styles.feedbackItem}>
              <View>
                <Text style={styles.feedbackText}>{item.feedback}</Text>
                <Text style={styles.feedbackRating}>Food Name: {item.food}</Text>
                <Text style={styles.feedbackRating}>Rating: {item.rating}</Text>
              </View>
            </View>
            <ScrollView horizontal>
              {item.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.feedbackImage}
                />
              ))}
            </ScrollView>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  feedbackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 16,
  },
  feedbackRating: {
    fontSize: 14,
  },
  feedbackImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default FeedbackViewList;
