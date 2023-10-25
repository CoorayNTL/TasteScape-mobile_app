import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, Image, StyleSheet, Alert, FlatList } from "react-native";
import ReviewFoodScreen from "./ReviewFoodScreen";

const ManageUserFeedBack = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState("view");
    const [gridLayout, setGridLayout] = useState(true); // To toggle grid view

    useEffect(() => {
        const sampleFeedbackData = [
            {
                id: "1",
                name: "Sample Food Item 1",
                description: "This is a delicious sample food item 1. This food item is very delicious and tasty. It's a must-try!",
                image: "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR8cwEvC4A6CutRrMu2vXyQxuAvoUzEdeo34TZH2E6tjxX3yAeKJaBU_Ib5yFpgtpoA",
                feedback: "Great food!",
                rating: 5,
                images: [
                    "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR8cwEvC4A6CutRrMu2vXyQxuAvoUzEdeo34TZH2E6tjxX3yAeKJaBU_Ib5yFpgtpoA",
                    "https://example.com/food-image-2.jpg",
                    "https://example.com/food-image-3.jpg",
                ],
            },
            {
                id: "2",
                name: "Sample Food Item 2",
                description: "This is a delicious sample food item 2. It's a great choice for your next meal. Try it now!",
                image: "https://www.foodandwine.com/thmb/NazaINeaNJiPVCH_tpkWanBFwmk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/birria-tacos-FT-RECIPE0420-8263f4373cb84c639c52f30d39237a73.jpg",
                feedback: "Delicious!",
                rating: 4,
                images: [
                    "https://www.foodandwine.com/thmb/NazaINeaNJiPVCH_tpkWanBFwmk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/birria-tacos-FT-RECIPE0420-8263f4373cb84c639c52f30d39237a73.jpg",
                    "https://example.com/food-image-5.jpg",
                ],
            },
            {
              id: "3",
              name: "Sample Food Item 2",
              description: "This is a delicious sample food item 2. It's a great choice for your next meal. Try it now!",
              image: "https://www.foodandwine.com/thmb/NazaINeaNJiPVCH_tpkWanBFwmk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/birria-tacos-FT-RECIPE0420-8263f4373cb84c639c52f30d39237a73.jpg",
              feedback: "Delicious!",
              rating: 4,
              images: [
                  "https://www.foodandwine.com/thmb/NazaINeaNJiPVCH_tpkWanBFwmk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/birria-tacos-FT-RECIPE0420-8263f4373cb84c639c52f30d39237a73.jpg",
                  "https://example.com/food-image-5.jpg",
              ],
          },
        ];

        setFeedbackData(sampleFeedbackData);
    }, []);

    const handleEditFeedback = (feedback) => {
        setSelectedFeedback(feedback);
        setMode("edit");
        setModalVisible(true);
    };

    const handleDeleteFeedback = (feedback) => {
        Alert.alert("Delete feedback", "Are you sure?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => {
                    const newFeedbackData = feedbackData.filter((item) => item.id !== feedback.id);
                    setFeedbackData(newFeedbackData);
                    Alert.alert("Feedback deleted successfully!");
                },
            },
        ]);
    };

    const toggleGridLayout = () => {
        setGridLayout(!gridLayout);
    };

    return (
        <View style={styles.container}>
            <Button title={`Switch to ${gridLayout ? 'List' : 'Grid'} View`} onPress={toggleGridLayout} />
            {gridLayout ? (
                <FlatGrid
                    feedbackData={feedbackData}
                    handleEditFeedback={handleEditFeedback}
                    handleDeleteFeedback={handleDeleteFeedback}
                />
            ) : (
                <FlatList
                    data={feedbackData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.feedbackItem}>
                            <Image source={{ uri: item.image }} style={styles.feedbackImage} />
                            <Text style={styles.feedbackTitle}>{item.name}</Text>
                            <Text style={styles.feedbackDescription}>{item.description}</Text>
                            <Button
                                title="Edit Feedback"
                                onPress={() => handleEditFeedback(item)}
                                style={styles.editButton}
                            />
                            <Button
                                title="Delete Feedback"
                                onPress={() => handleDeleteFeedback(item)}
                                style={styles.deleteButton}
                            />
                        </View>
                    )}
                />
            )}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ReviewFoodScreen
                    data={selectedFeedback}
                    mode={mode}
                    onEdit={() => setMode("edit")}
                    onDelete={() => {
                        setMode("view");
                        setModalVisible(false);
                    }}
                    feedbackData={feedbackData}
                />
            </Modal>
        </View>
    );
};

const FlatGrid = ({ feedbackData, handleEditFeedback, handleDeleteFeedback }) => (
    <FlatList
        data={feedbackData}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set the number of columns for a grid-like layout
        renderItem={({ item }) => (
            <View style={styles.gridFeedbackItem}>
                <Image source={{ uri: item.image }} style={styles.feedbackImage} />
                <Text style={styles.feedbackTitle}>{item.name}</Text>
                <Text style={styles.feedbackDescription}>{item.description}</Text>
                <Button
                    title="Edit Feedback"
                    onPress={() => handleEditFeedback(item)}
                    style={styles.editButton}
                />
                <Button
                    title="Delete Feedback"
                    onPress={() => handleDeleteFeedback(item)}
                    style={styles.deleteButton}
                />
            </View>
        )}
    />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
},
feedbackItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
},
gridFeedbackItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "48%",
    marginBottom: 20,
},
feedbackTitle: {
    fontSize: 18,
    fontWeight: "bold",
},
feedbackDescription: {
    fontSize: 14,
},
feedbackImage: {
    width: "100%",
    height: 150,
    marginVertical: 10,
},
buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
},
editButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
},
deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
},
});

export default ManageUserFeedBack;

