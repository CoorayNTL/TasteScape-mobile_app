import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, Image, StyleSheet, Alert, FlatList } from "react-native";
import ReviewFoodScreen from "./ReviewFoodScreen";
import { db } from "../firebase"; // Import your Firebase configuration
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { collection, updateDoc,getDocs } from "firebase/firestore";

const ManageUserFeedBack = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [mode, setMode] = useState("view");
    const [gridLayout, setGridLayout] = useState(true); // To toggle grid view

    useEffect(() => {
        // Reference to the Firestore collection
        const feedbackCollection = collection(db, "feedback");

        // Fetch data from Firebase Firestore
        getDocs(feedbackCollection)
            .then((querySnapshot) => {
                const feedbackData = [];
                querySnapshot.forEach((doc) => {
                    const feedback = doc.data();
                    feedbackData.push(feedback);
                });
                setFeedbackData(feedbackData);
            })
            .catch((error) => {
                console.error("Error fetching feedback data: ", error);
            });
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
                    // Reference to the specific feedback document in Firestore
                    const feedbackDocRef = doc(db, "feedback", feedback.id);

                    // Delete the document
                    deleteDoc(feedbackDocRef)
                        .then(() => {
                            const newFeedbackData = feedbackData.filter((item) => item.id !== feedback.id);
                            setFeedbackData(newFeedbackData);
                            Alert.alert("Feedback deleted successfully!");
                        })
                        .catch((error) => {
                            console.error("Error deleting feedback: ", error);
                        });
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
        borderWidth:1,
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
