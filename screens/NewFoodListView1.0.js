
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
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
            <FlatList
                style={styles.gridContainer}
                data={dishes}
                numColumns={2} 
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.gridItem}
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
                                    imageSize={20}
                                    startingValue={item.rating}
                                />
                                <Text style={styles.countText}>
                                    {" "}
                                    ({item.numberOfReviews})
                                </Text>
                            </View>

                            <Pressable
                                style={styles.updateButton}
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
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        paddingHorizontal: 10,
    },
    gridItem: {
        flex: 1,
        margin: 5, 
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        overflow: "hidden", 
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
        fontSize: 16,
        fontWeight: "420",
        marginTop: 5,
        marginBottom: 10,
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

    updateButton: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
       
        backgroundColor: "#FF724C",
    },
});

export default NewFoodListView1;
