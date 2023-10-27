import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";

import { Rating } from "react-native-ratings";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { Alert } from "react-native";

const FeedbackView = ({ navigation, route }) => {
    const { feedback } = route.params;

    const handeldeleteFeedback = async () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this feedback?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        const firestore = getFirestore();
                        const feedbackDocRef = doc(
                            firestore,
                            "reviews",
                            feedback.id
                        );

                        try {
                            await deleteDoc(feedbackDocRef);
                            alert("Feedback deleted successfully");
                            console.log("Feedback deleted successfully");
                            navigation.navigate("FeedbackList");
                        } catch (error) {
                            console.error("Error deleting feedback:", error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Feedback</Text>
            <ScrollView>
                <View style={styles.feedbackItem}>
                    <Image
                        source={{ uri: feedback.reviewImages }}
                        style={styles.feedbackImage}
                    />
                    <View>
                        <Text style={styles.feedbackName}>
                            {feedback.feedback}
                        </Text>
                        <Text style={styles.feedbackDescription}>
                            {feedback.food}
                        </Text>
                        <Text style={styles.feedbackRating}>
                            <Rating
                                imageSize={10}
                                startingValue={feedback.rating}
                            />
                        </Text>
                    </View>
                </View>
                <ScrollView horizontal>
                    {feedback.images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={styles.feedbackImage}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
            <Button
                title="Update Review"
                color="#FF724C"
                onPress={() => {
                    navigation.navigate("UpdateFeedBack", { review: feedback });
                }}
            />

            <Button
                title="Delete Review"
                color="#FF0000"
                onPress={handeldeleteFeedback}
            />
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
    feedbackImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 10,
    },
    feedbackName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    feedbackDescription: {
        fontSize: 14,
        color: "#FF724C",
    },
    feedbackRating: {
        fontSize: 14,
    },
});

export default FeedbackView;
