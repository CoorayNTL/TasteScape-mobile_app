
  
// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     Alert,
//     Pressable,
//     ScrollView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { collection, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const UpdateFeedBack = ({ navigation, route }) => {
//     const [id, setId] = useState("");
//     const [feedback, setFeedback] = useState("");
//     const [food , setFood] = useState("");
//     const [rating, setRating] = useState(0);
//     const [images, setImages] = useState([]);

//     const { review } = route.params;

//     useEffect(() => {
//         setId(review.id);
//         setFeedback(review.feedback || "");
//         setFood(review.food || "");
//         setRating(review.rating || "");
//         setImages(review.images || []);
//     }, [review]);

//     const handleImageUpload = () => {
//         const options = {
//             title: "Select Review Image",
//             storageOptions: {
//                 skipBackup: true,
//                 path: "images",
//             },
//         };

//         ImagePicker.showImagePicker(options, (response) => {
//             if (response.didCancel) {
//                 console.log("User cancelled image picker");
//             } else if (response.error) {
//                 console.log("ImagePicker Error: ", response.error);
//             } else {
//                 addImage(response.uri);
//             }
//         });
//     };

//     const addImage = (imageUri) => {
//         setImages([...images, imageUri]);
//     };

//     const removeImage = (index) => {
//         const updatedImages = [...images];
//         updatedImages.splice(index, 1);
//         setImages(updatedImages);
//     };

//     const updateFeedBackInFirebase = async () => {
//         if (!feedback || !rating) {
//             Alert.alert(
//                 "Validation Error",
//                 "Feedback and rating are required."
//             );
//             return;
//         }

//         try {
//             const reviewesCollection = collection(db, "reviews");
//             console.log("Updating review in Firebase");
//             const reviewRef = doc(reviewesCollection, id);
//             const updatedReviewData = {
//                 feedback,
//                 food,
//                 rating,
//                 images,
//             };

//             await updateDoc(reviewRef, updatedReviewData);
//             console.log("Review updated successfully");

//             navigation.navigate("Menu");
//         } catch (error) {
//             console.error("Error updating review: " + error.message);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Update Review</Text>
//             <TouchableOpacity onPress={handleImageUpload}>
//                 <Text style={styles.uploadText}>
//                     Add Images to the Review
//                 </Text>
//             </TouchableOpacity>

//             <ScrollView horizontal>
//                 {images.map((imageUri, index) => (
//                     <View key={index} style={styles.imageContainer}>
//                         <Image
//                             source={{ uri: imageUri }}
//                             style={styles.reviewImage}
//                         />
//                         <View style={styles.buttonContainer}>
//                             <Button
//                                 title="Remove"
//                                 onPress={() => removeImage(index)}
//                             />
//                             <Button
//                                 title="Update"
//                                 onPress={() => {/* handle image update logic */}}
//                             />
//                         </View>
//                     </View>
//                 ))}
//             </ScrollView>

//             <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Feedback</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={feedback}
//                     onChangeText={setFeedback}
//                 />
//             </View>

//             <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Rating</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={rating}
//                     onChangeText={setRating}
//                 />
//             </View>

//             <Pressable
//                 style={styles.updateButton}
//                 onPress={updateFeedBackInFirebase}
//             >
//                 <Text style={styles.text}>Update Review</Text>
//             </Pressable>
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
//     inputContainer: {
//         marginBottom: 10,
//     },
//     inputLabel: {
//         fontSize: 16,
//         fontWeight: "bold",
//     },
//     input: {
//         borderBottomWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//     },
//     imageContainer: {
//         marginRight: 10,
//     },
//     reviewImage: {
//         width: 200,
//         height: 200,
//         marginBottom: 10,
//     },
//     buttonContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     uploadText: {
//         fontSize: 16,
//         color: "#FF724C",
//     },
//     updateButton: {
//         alignItems: "center",
//         justifyContent: "center",
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         borderRadius: 30,
//         elevation: 3,
//         backgroundColor: "#FF724C",
//     },
//     text: {
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: "bold",
//         letterSpacing: 0.25,
//         color: "white",
//     },
// });

// export default UpdateFeedBack;



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
    ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const UpdateFeedBack = ({ navigation, route }) => {
    const [id, setId] = useState("");
    const [feedback, setFeedback] = useState("");
    const [food, setFood] = useState("");
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState([]);

    const { review } = route.params;

    useEffect(() => {
        setId(review.id);
        setFeedback(review.feedback || "");
        setFood(review.food || "");
        setRating(review.rating || "");
        setImages(review.images || []);
    }, [review]);

    const handleImageUpload = () => {
        const options = {
            title: "Select Review Image",
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
                addImage(response.uri);
            }
        });
    };

    const addImage = (imageUri) => {
        setImages([...images, imageUri]);
    };

    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const updateFeedBackInFirebase = async () => {
        if (!feedback || !rating) {
            Alert.alert(
                "Validation Error",
                "Feedback and rating are required."
            );
            return;
        }

        Alert.alert(
            "Update Review",
            "Are you sure you want to update this review?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Update",
                    onPress: async () => {
                        try {
                            const reviewsCollection = collection(db, "reviews");
                            const reviewRef = doc(reviewsCollection, id);
                            const updatedReviewData = {
                                feedback,
                                food,
                                rating,
                                images,
                            };

                            await updateDoc(reviewRef, updatedReviewData);
                            console.log("Review updated successfully");

                            navigation.navigate("Menu");
                        } catch (error) {
                            console.error("Error updating review: " + error.message);
                        }
                    },
                },
            ]
        );
    };

    const confirmRemoveImage = (index) => {
        Alert.alert(
            "Remove Image",
            "Are you sure you want to remove this image?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    onPress: () => removeImage(index),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Review</Text>
            <TouchableOpacity onPress={handleImageUpload}>
                <Text style={styles.uploadText}>
                    Add Images to the Review
                </Text>
            </TouchableOpacity>

            <ScrollView horizontal>
                {images.map((imageUri, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.reviewImage}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Remove"
                                onPress={() => confirmRemoveImage(index)}
                            />
                            <Button
                                title="Update"
                                onPress={() => {/* handle image update logic */
                              }}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Feedback</Text>
                <TextInput
                    style={styles.input}
                    value={feedback}
                    onChangeText={setFeedback}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Rating</Text>
                <TextInput
                    style={styles.input}
                    value={rating}
                    onChangeText={setRating}
                />
            </View>

            <Pressable
                style={styles.updateButton}
                onPress={updateFeedBackInFirebase}
            >
                <Text style={styles.text}>Update Review</Text>
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
    imageContainer: {
        marginRight: 10,
    },
    reviewImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    uploadText: {
        fontSize: 16,
        color: "#FF724C",
    },
    updateButton: {
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

export default UpdateFeedBack;
