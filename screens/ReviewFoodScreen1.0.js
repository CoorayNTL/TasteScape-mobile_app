
import React, { useState } from "react";
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
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import StarRating from "react-native-star-rating";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const AddReview = ({ navigation, route }) => {
    const { foodData } = route.params;
    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [reviewImages, setReviewImages] = useState([]);
    const [feedbackImages, setFeedbackImages] = useState([]);

    const handleImageUpload = (type) => {
        const options = {
            title: `Select ${type} Image`,
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };

        ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel) {
                console.log(`User cancelled ${type} image picker`);
            } else if (response.error) {
                console.log(`ImagePicker Error for ${type}: `, response.error);
            } else {
                const uri = response.uri;

                try {
                    // Upload the image to Firebase Storage
                    const storageRef = ref(
                        storage,
                        `${type}/${new Date().getTime()}`
                    );
                    const uploadTask = uploadBytesResumable(storageRef, uri);
                    // Listen for events during upload
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            // Handle progress
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            console.log(`Upload is ${progress}% done`);
                            set
                        },
                        (error) => {
                            // Handle error
                            console.error("Error uploading image: ", error);
                        },
                        async () => {
                            // Handle successful upload
                            const downloadURL = await getDownloadURL(
                                uploadTask.snapshot.ref
                            );
                            console.log("File available at", downloadURL);

                            // Add the download URL to the appropriate array
                            if (type === "Review") {
                                setReviewImages((prevImages) => [
                                    ...prevImages,
                                    { uri: downloadURL },
                                ]);
                            } else {
                                setFeedbackImages((prevImages) => [
                                    ...prevImages,
                                    { uri: downloadURL },
                                ]);
                            }
                        }
                    );
                } catch (error) {
                    console.error("Error uploading image: ", error);
                }
            }
        });
    };

    const addReviewToFirebase = async () => {
        if ( !feedback || rating === 0) {
            Alert.alert("Please fill all the fields");
            return;
        }
        //feedback,food,images,rating
        try {
            const docRef = await addDoc(collection(db, "reviews"), {
                // name,
                feedback,
                rating,
                reviewImages: foodData.image,
                // feedbackImages: feedbackImages.map((image) => image.uri),
                foodId: foodData.id,
                foodName: foodData.name,
                food_discription : foodData.description,
            });
            Alert.alert("Review added successfully");
            navigation.goBack();
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Error adding document");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Review</Text>
            <Text style={styles.foodName}>{foodData.name}</Text>
            <Image source={{ uri: foodData.image }} style={styles.foodImage} />
            <Text  style = {styles.foodName}>{foodData.description}</Text>
            <View style={styles.imageUploadSection}>
                {/* <TouchableOpacity onPress={() => handleImageUpload("Review")}>
                    {reviewImages.length > 0 ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {reviewImages.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image.uri }}
                                    style={styles.reviewImage}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <Text style={styles.uploadText}>
                            Upload Review Images
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleImageUpload("Feedback")}>
                    {feedbackImages.length > 0 ? (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {feedbackImages.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: image.uri }}
                                    style={styles.reviewImage}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <Text style={styles.uploadText}>
                            Upload Feedback Images
                        </Text>
                    )}
                </TouchableOpacity> */}
            </View>
            {/* <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View> */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Feedback</Text>
                <TextInput
                    style={styles.input}
                    value={feedback}
                    onChangeText={setFeedback}
                />
            </View>
            <View style={styles.ratingContainer}>
                <Text style={styles.inputLabel}>Rating</Text>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    selectedStar={(rating) => setRating(rating)}
                />
            </View>
            <Pressable style={styles.button} onPress={addReviewToFirebase}>
                <Text style={styles.text}>Add Review</Text>
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
    ratingContainer: {
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
    reviewImage: {
        width: 200,
        height: 200,
        marginRight: 10,
    },
    uploadText: {
        fontSize: 16,
        color: "#FF724C",
    },
    foodName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    foodImage: {
        width: "100%",
        height: 150,
        marginBottom: 10,
    },
    imageUploadSection: {
        marginBottom: 20,
    },
    button: {
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

export default AddReview;
