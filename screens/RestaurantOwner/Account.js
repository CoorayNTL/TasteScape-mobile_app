import React from "react";
import { View, Text,Buttton, StyleSheet } from "react-native";

const Account =({navigation})=>{
    return (
        <View style={styles.container}>
            <Text>Chat</Text>
            
        </View>
    
    )
}
export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});