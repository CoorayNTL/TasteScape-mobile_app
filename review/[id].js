import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    View,
    Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";

export default function Review() {
    const navigation = useNavigation();
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { id } = navigation.state.params;
        db.collection("foods")
            .doc(id)
            .get()
            .then((doc) => {
                const food = { id: doc.id, ...doc.data() };
                setFood(food);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert("Error", error.message);
            });
    }, [navigation]);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
        ``;
    }

    return (
        <View style={styles.container}>
            <Text>Add Review</Text>
            <Button
                title="Review Food"
                onPress={() =>
                    navigation.navigate("ReviewFood", { id: food.id })
                } // Navigate to ReviewFood with foodId
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});
