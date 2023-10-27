import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";

const PremiumBanner = () => {
  return (
    <View style={{ backgroundColor: "#FF724C", padding: 10, margin: 10 ,borderRadius: 6}}>
      <Text style={{ fontSize: 18 }}>
        Would you like to upgrade to premium version?
      </Text>
      <View style={{ display: "flex", flexDirection: "row" ,marginTop:10}}>
        <TouchableOpacity style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 12,padding:3, marginHorizontal: 6 ,borderRadius: 6}}>
          <Text style={{ fontSize: 16 }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 12,padding:3, marginHorizontal: 6 ,borderRadius: 6}}>
          <Text style={{ fontSize: 16 }}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 12,padding:3, marginHorizontal: 6 ,borderRadius: 6}}>
          <Text style={{ fontSize: 16 }}>Maybe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PremiumBanner;

const styles = StyleSheet.create({});
