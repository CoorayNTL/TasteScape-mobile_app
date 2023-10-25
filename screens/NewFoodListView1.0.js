import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Rating } from "react-native-ratings";
import { useFocusEffect } from "@react-navigation/native";

const NewFoodListView1 = ({ navigation }) => {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        try {
            const dishesCollection = collection(db, "foodtypes");
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

    useFocusEffect(
        React.useCallback(() => {
            fetchDishes();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.titleOfView}>Menu</Text>
            {/* <Shadow style={styles.shadowContainer}> */}
            <FlatList
                style={styles.shadowContainer}
                data={dishes}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.itemContainer}
                        onPress={() =>
                            navigation.navigate("FoodList", { id: item.id })
                        }
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />

                        <View style={styles.content}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                            <View style={styles.reviewContainer}>
                                <Rating
                                    imageSize={10}
                                    startingValue={item.rating}
                                />
                                <Text style={styles.countText}>
                                    {" "}
                                    ({item.numberOfReviews})
                                </Text>
                            </View>

                            <Pressable
                                style={styles.reviewButton}
                                onPress={() =>
                                    navigation.navigate("Review", {
                                        foodData: item,
                                    })
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Add Review
                                </Text>
                            </Pressable>
                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id}
            />
            {/* </Shadow> */}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        overflow: "hidden", // Ensure children don't overflow
    },
    image: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    titleOfView: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    description: {
        fontSize: 13,
        fontWeight: "400",
        marginTop: 5,
        marginBottom: 10,
    },
    reviewButtonContainer: {
        borderTopWidth: 1, // Add a border to separate content from the button
        borderColor: "grey",
        paddingVertical: 10,
    },
    reviewButton: {
        width: "100%",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "grey",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "600",
    },
    countText: {
        fontSize: 13,
        fontWeight: "400",
        marginBottom: 10,
    },
    reviewContainer: {
        flexDirection: "row",
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    shadowContainer: {
        margin: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default NewFoodListView1;
