import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native";

import { Image } from "expo-image";
import { Rating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Crypto from "expo-crypto";
//import { useRouter } from "expo-router";
import { db, storage } from "../firebase";
import { runTransaction } from "firebase/firestore";


const ReviewFoodScreen = () => {
    const data = {
        id: "sample_id",
        name: "Sample Food Item",
        description: "This is a delicious sample food item.",
        image: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR8cwEvC4A6CutRrMu2vXyQxuAvoUzEdeo34TZH2E6tjxX3yAeKJaBU_Ib5yFpgtpoA",
    };

    //const router = useRouter();
    const [feedback, setFeedback] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [rating, setRating] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    if (!data || typeof data !== "object" || !data.image) {
        return (
            <View style={styles.container}>
                <Text>Data not available.</Text>
            </View>
        );
    }

    const canSubmit = useMemo(() => {
        const hasFeedback = feedback.length > 0;
        const hasRating = rating > 0;
        const hasImages = images.length > 0;
        const allUploaded = images.every((img) => !img.uploading);
        return hasFeedback && hasImages && allUploaded && hasRating;
    }, [feedback, images]);

    const submitReview = async () => {
        setLoading(true);
        try {
            const review = {
                feedback,
                rating,
                images: images.map((img) => img.remote),
            };
            const foodRef = db.collection("foods").doc(data.id);
            await runTransaction(db, async (transaction) => {
                const foodDoc = await transaction.get(foodRef);
                const food = foodDoc.data();
                const newReviews = [...food.reviews, review];
                const newRating =
                    newReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                    newReviews.length;
                transaction.update(foodRef, {
                    reviews: newReviews,
                    rating: newRating,
                });
            });
            Alert.alert("Success", "Review submitted successfully.");
            //router.push(`/review/${data.id}`);
        } catch (e) {
            Alert.alert("Error", e.message);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        try {
            setImages([...images, { local: uri, uploading: true }]);
            const UUID = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                uri
            );
            const response = await fetch(uri);

            const blob = await response.blob();
            const ref = storage.ref().child(`images/${UUID}`);
            const task = ref.put(blob);

            task.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                },
                (error) => {
                    console.log("Error uploading image: ", error.message);
                    setImages(images.filter((img) => img.local !== uri));
                },
                async () => {
                    const remoteURL = await ref.getDownloadURL();
                    setImages(
                        images.map((img) =>
                            img.local === uri
                                ? { local: uri, remote: remoteURL }
                                : img
                        )
                    );
                }
            );
        } catch (e) {
            console.log("Error uploading image: ", e.message);
            setImages(images.filter((img) => img.local !== uri));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <View style={styles.foodContainer}>
                    <Image
                        source={{ uri: data.image }}
                        style={styles.image}
                        contentFit="cover"
                    />
                    <View style={styles.foodRight}>
                        <Text style={styles.foodTitle}>{data.name}</Text>
                        <Text style={styles.foodDescription} numberOfLines={3}>
                            {data.description}
                        </Text>
                    </View>
                </View>
                <TextInput
                    value={feedback}
                    multiline
                    placeholder="Leave your feedback..."
                    style={styles.input}
                    onChangeText={(text) => setFeedback(text)}
                    maxLength={250}
                />
                <Rating showRating onFinishRating={setRating} />

                <Text style={styles.addImageText}>Add Images</Text>
                <View style={styles.imagesContainer}>
                    {images.map((image) => (
                        <View style={styles.imageBox} key={image.local}>
                            <Image
                                source={{ uri: image.remote || image.local }}
                                style={styles.flex}
                                contentFit="cover"
                            />
                            {image.uploading ? (
                                <View style={styles.imageLoadingContainer}>
                                    <ActivityIndicator color={"blue"} />
                                </View>
                            ) : null}
                        </View>
                    ))}
                    {images?.length < 3 ? (
                        <View style={styles.imageBox}>
                            <TouchableOpacity
                                style={styles.addImageButton}
                                onPress={pickImage}
                            >
                                <AntDesign
                                    name="plus"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </View>
            </View>
            <TouchableOpacity
                style={[
                    styles.submitButton,
                    {
                        backgroundColor: canSubmit ? "#000" : "transparent",
                    },
                ]}
                disabled={!canSubmit}
                onPress={submitReview}
            >
                {loading ? (
                    <ActivityIndicator color={"white"} />
                ) : (
                    <Text
                        style={[
                            styles.submitText,
                            {
                                color: canSubmit ? "#fff" : "grey",
                            },
                        ]}
                    >
                        Submit
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        paddingTop: 20,
    },
    foodContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    image: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: "grey",
    },
    foodRight: {
        width: "75%",
    },
    foodTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginTop: 2,
        marginBottom: 3,
    },
    foodDescription: {
        fontSize: 13,
        fontWeight: "400",
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        padding: 10,
        height: 120,
        marginTop: 20,
        marginBottom: 20,
    },
    imagesContainer: {
        flexDirection: "row",
        marginTop: 30,
        // justifyContent: "center",
    },
    imageBox: {
        width: "30%",
        height: 100,
        borderWidth: 1,
        borderColor: "grey",
        marginRight: 10,
    },
    flex: { flex: 1 },
    submitButton: {
        width: "100%",
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: "grey",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 20,
    },
    submitText: {
        fontSize: 15,
        fontWeight: "600",
    },
    addImageButton: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    imageLoadingContainer: {
        position: "absolute",
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
    },
    addImageText: {
        fontSize: 15,
        fontWeight: "600",
        marginTop: 20,
    },
});

export default ReviewFoodScreen;
