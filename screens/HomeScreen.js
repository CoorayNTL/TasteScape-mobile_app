import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    ScrollView,
    Pressable,
    Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import FoodTypes from "../components/FoodTypes";
import QuickFood from "../components/QuickFood";
import { Ionicons } from "@expo/vector-icons";
import hotels from "../data/hotels";
import MenuItem from "../components/MenuItem";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    const data = hotels;
    return (
        <ScrollView style={{ marginTop: 50 }}>
            <Pressable
                // onPress={() => navigation.navigate("FeedbackViewList")}
                //onPress={() => navigation.navigate("AdUploadScreen")}
                
               // onPress={() => navigation.navigate("NewFoodListView")}
                // onPress={() => navigation.navigate("ViewAddDetailsScreen")}
                style={{ marginLeft: "auto", marginRight: 7 }}
            >
                <Image
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                    source={{
                        uri: "https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1060&t=st=1696350856~exp=1696351456~hmac=f4a2d46f5cde967eb43b10409ba53dd0fbbc50dd04d619be059f25f00fbdfaa0",
                    }}
                />
            </Pressable>
            {/* Search Bar  */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    borderColor: "#C0C0C0",
                    borderRadius: 7,
                }}
            >
                <TextInput
                    style={{ fontSize: 17 }}
                    placeholder="Search for Restaurant item or more"
                />
                <AntDesign name="search1" size={24} color="#E52B50" />
            </View>

            {/* Image slider Component */}
            <Carousel />

            {/* Food Item Types */}
            <FoodTypes />

            {/* Quick Food Component */}
            <QuickFood />

            {/* Filter buttons */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <Pressable
                    style={{
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                        padding: 10,
                        borderRadius: 20,
                        width: 120,
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ marginRight: 6 }}>Filter</Text>
                    <Ionicons name="filter" size={20} color="black" />
                </Pressable>

                <Pressable
                    style={{
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        width: 120,
                    }}
                    onPress={() => navigation.navigate("FeedbackViewList")}
                >
                    <Text>List of Rating</Text>
                </Pressable>

                <Pressable
                    style={{
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#D0D0D0",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                    }}

                    onPress={() => navigation.navigate("NewFoodListView")}
                >
                    <Text>Sort By Rating</Text>
                </Pressable>
            </View>
            {data.map((item, index) => (
                <MenuItem key={index} item={item} />
            ))}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
