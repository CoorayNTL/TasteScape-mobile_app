import React from "react";
import { View, Text,Buttton, StyleSheet } from "react-native";

const Orders =({navigation})=>{
    return (
        <View style={styles.container}>
            <Text>Orders</Text>
            
        </View>
    
    )
}
export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});