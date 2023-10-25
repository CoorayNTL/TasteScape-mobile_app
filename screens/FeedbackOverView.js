// import React from "react";
// import { View, Text, Image, Button, StyleSheet, FlatList } from "react-native";
// import { getFirestore, doc, deleteDoc } from "firebase/firestore";

// const FeedbackOverView = ({ route, navigation }) => {
//   // Extract review details from the route params
//   const { review } = route.params;

//   const handleDeleteReview = async () => {
//     const firestore = getFirestore();
//     const reviewDocRef = doc(firestore, "reviews", review.id);

//     try {
//       await deleteDoc(reviewDocRef);
//       console.log('Review deleted successfully');
//       navigation.navigate("Menu");
//     } catch (error) {
//       console.error('Error deleting review:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: review.image }} style={styles.reviewImage} />
//       <Text style={styles.reviewName}>{review.name}</Text>
//       <Text style={styles.description}>{review.description}</Text>
//       <Text style={styles.feedback}>Feedback: {review.feedback || "No feedback"}</Text>
//       <Text style={styles.rating}>Rating: {review.rating || "No rating"}</Text>

//       {/* Display multiple images using FlatList */}
//       <FlatList
//         data={review.images}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={styles.additionalImage} />
//         )}
//       />

//       <Button
//         title="Update Review"
//         color="#FF724C"
//         onPress={() => {
//           navigation.navigate("UpdateReview", { review });
//         }}
//       />

//       <Button
//         title="Delete Review"
//         color="#FF0000"
//         onPress={handleDeleteReview}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 20,
//   },
//   reviewImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 10,
//   },
//   additionalImage: {
//     width: 200,
//     height: 200,
//     marginBottom: 10,
//   },
//   reviewName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   feedback: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   rating: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
// });

// export default FeedbackOverView;

// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     Button,
//     StyleSheet,
//     Image,
//     ScrollView,
// } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";

// const FeedbackView = ({ navigation, route }) => {
//     const { feedback } = route.params;

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Customer Feedback</Text>
//             <ScrollView>
//                 <View style={styles.feedbackItem}>
//                     <Image
//                         source={{ uri: feedback.image }}
//                         style={styles.feedbackImage}
//                     />
//                     <View>
//                         <Text style={styles.feedbackName}>{feedback.name}</Text>
//                         <Text style={styles.feedbackDescription}>
//                             {feedback.description}
//                         </Text>
//                         <Text style={styles.feedbackRating}>
//                             Rating: {feedback.rating}
//                         </Text>
//                     </View>
//                 </View>
//                 <ScrollView horizontal>
//                     {feedback.images.map((image, index) => (
//                         <Image
//                             key={index}
//                             source={{ uri: image }}
//                             style={styles.feedbackImage}
//                         />
//                     ))}
//                 </ScrollView>
//             </ScrollView>
//             <Button
//                 title="Update Review"
//                 color="#FF724C"
//                 onPress={() => {
//                     navigation.navigate("UpdateFeedBack", { review: feedback });
//                 }}
//             />
//             <Button
//                 title="Back to Feedback List"
//                 onPress={() => {
//                     navigation.navigate("FeedbackList");
//                 }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     feedbackItem: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         borderBottomWidth: 1,
//         borderBottomColor: "#ccc",
//         padding: 10,
//         alignItems: "center",
//     },
//     feedbackImage: {
//         width: 80,
//         height: 80,
//         marginRight: 10,
//         borderRadius: 10,
//     },
//     feedbackName: {
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     feedbackDescription: {
//         fontSize: 14,
//         color: "#FF724C",
//     },
//     feedbackRating: {
//         fontSize: 14,
//     },
// });

// export default FeedbackView;

import React from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const FeedbackView = ({ navigation, route }) => {
    const { feedback, food, images, rating } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Feedback</Text>
            <ScrollView>
                <View style={styles.feedbackItem}>
                    <Image
                        source={{ uri: feedback.image }}
                        style={styles.feedbackImage}
                    />
                    <View>
                        <Text style={styles.feedbackName}>{feedback.feedback}</Text>
                        <Text style={styles.feedbackDescription}>
                            {feedback.food}
                        </Text>
                        <Text style={styles.feedbackRating}>
                            Rating: {feedback.rating}
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
                title="Back to Feedback List"
                onPress={() => {
                    navigation.navigate("FeedbackList");
                }}
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
