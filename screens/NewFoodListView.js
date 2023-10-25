// import React, { useEffect, useState } from "react";
// import { Alert, FlatList, StyleSheet, View } from "react-native";
// import db from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import FoodListItem from "../components/FoodListItem";

// const NewFoodListView = () => {
//     const [foods, setFoods] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         loadFoods();
//     }, []);

//     const loadFoods = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "foods"));
//             const foods = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setFoods(foods);
//         } catch (e) {
//             Alert.alert("Error getting foods", e.message);
//         } finally {
//             setLoading(false);
//         }
//       };

//     const renderItem = ({ item }) => <FoodListItem data={item} />;

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={foods}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 onRefresh={loadFoods}
//                 refreshing={loading}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         paddingTop: 20,
//     },
// });

// export default NewFoodListView;

import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import FoodListItem from "../components/FoodListItem";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

const [] = [
    {
        id: "1",
        name: "Sample Food 1",
        description: "This is a delicious sample food item 1.",
        image: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/13/2560x1920/sd-aspect-1459442142-delish-cheesy-ground-beef-tacos.jpg?resize=1200:*",
        rating: 4.5,
        numberOfReviews: 25,
    },
    {
        id: "2",
        name: "Sample Food 2",
        description: "This is a delicious sample food item 2.",
        image: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/13/2560x1920/sd-aspect-1459442142-delish-cheesy-ground-beef-tacos.jpg?resize=1200:*",
        rating: 4.2,
        numberOfReviews: 30,
    },
    {
        id: "3",
        name: "Sample Food 3",
        description: "This is a delicious sample food item 3.",
        image: "https://hips.hearstapps.com/del.h-cdn.co/assets/16/13/2560x1920/sd-aspect-1459442142-delish-cheesy-ground-beef-tacos.jpg?resize=1200:*",
        rating: 4.7,
        numberOfReviews: 18,
    },
];

const NewFoodListView = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false); 
    const navigation = useNavigation();

    const loadFoods = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "foodtypes"));
            const foods = querySnapshot.docs.forEach((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(foods);
            setFoods(foods);
        } catch (e) {
            Alert.alert("Error getting foods", e.message);
        } finally {
            setLoading(false);
        }
    };
    //firebase getdata
    useEffect(() => {
        loadFoods();
    }, []);

    const renderItem = ({ item }) => (
        <FoodListItem data={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onRefresh={loadFoods}
                refreshing={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
    },
});

export default NewFoodListView;
