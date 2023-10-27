import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function AdUploadScreen({ navigation }) {
    const [restaurantName, setRestaurantName] = useState("");
    const [foodName, setFoodName] = useState("");
    const [description, setDescription] = useState("");
    const [mediaUri, setMediaUri] = useState(null);
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    console.log("New file", change.doc.data());
                    setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
                }
            });
        });
        return () => unsubscribe();
    }, []);

    const handleUpload = async () => {
        if (restaurantName && foodName && description && mediaUri) {
            try {
                const mediaType = mediaUri.endsWith(".mp4") ? "video" : "image";

                const storageRef = ref(
                    storage,
                    `uploads/${new Date().getTime()}${
                        mediaType === "image" ? ".jpg" : ".mp4"
                    }`
                );
                const uploadTask = uploadBytesResumable(storageRef, mediaUri);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log(`Upload is ${progress}% done`);
                    },
                    (error) => {
                        console.error("Error uploading media: ", error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );

                        const adsCollection = collection(db, "ads");
                        const newAd = {
                            restaurant_name: restaurantName,
                            food_name: foodName,
                            description: description,
                            media_url: downloadURL,
                            media_type: mediaType,
                        };

                        const docRef = await addDoc(adsCollection, newAd);

                        setRestaurantName("");
                        setFoodName("");
                        setDescription("");
                        setMediaUri(null);
                        Alert.alert(
                            "Upload Successful",
                            "Your ad has been uploaded!"
                        );
                    }
                );
            } catch (error) {
                console.error("Error uploading media: ", error);
            }
        } else {
            Alert.alert("Incomplete Information", "Please fill in all fields.");
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setMediaUri(result.uri);

            await ImagePicker.getMediaInfoAsync(result.uri);
        }
    };

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setMediaUri(result.uri);

            await ImagePicker.getMediaInfoAsync(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Advertisement</Text>
            <TextInput
                style={styles.input}
                placeholder="Restaurant Name"
                value={restaurantName}
                onChangeText={(text) => setRestaurantName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Food Name"
                value={foodName}
                onChangeText={(text) => setFoodName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                multiline
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            {mediaUri ? (
                mediaUri.endsWith(".jpg") ? (
                    <Image source={{ uri: mediaUri }} style={styles.image} />
                ) : (
                    <Video
                        source={{ uri: mediaUri }}
                        style={styles.video}
                        resizeMode="cover"
                        shouldPlay
                        useNativeControls
                    />
                )
            ) : (
                <View style={styles.uploadButtonContainer}>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.uploadButtonText}>
                            Upload Image
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={pickVideo}
                    >
                        <Text style={styles.uploadButtonText}>
                            Upload Video
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <Button
                title="Upload Ad"
                color="#FF724C"
                onPress={handleUpload}
                style={{ borderRadius: 10 }}
            />

            {/* <Button
                title="Order Now"
                onPress={() => {
                    navigation.navigate("ViewAddDetailsScreen");
                }}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 10,
    },
    video: {
        width: "100%",
        height: 200,
        marginBottom: 10,
    },
    uploadButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    uploadButton: {
        flex: 1,
        backgroundColor: "#FF724C",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    uploadButtonText: {
        color: "white",
    },
});


//nomarl image upload view++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import { useEffect, useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   Platform,
// } from "react-native";
// import { Uploading } from "../components/Uploading";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { addDoc, collection, onSnapshot } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { Video } from "expo-av";
// import { UploadingAndroid } from "../components/UploadingAndroid";

// export default function Home() {
//   const [image, setImage] = useState("");
//   const [video, setVideo] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [files, setFiles] = useState([]);
  
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           console.log("New file", change.doc.data());
//           setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
//         }
//       });
//     });
//     return () => unsubscribe();
//   }, []);

//   async function pickImage() {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [3, 4],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       // upload the image
//       await uploadImage(result.assets[0].uri, "image");
//     }
//   }

//   async function pickVideo() {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//       allowsEditing: true,
//       aspect: [3, 4],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await uploadImage(result.assets[0].uri, "video");
//     }
//   }

//   async function uploadImage(uri, fileType) {
//     const response = await fetch(uri);
//     const blob = await response.blob();

//     const storageRef = ref(storage, "Stuff/" + new Date().getTime());
//     const uploadTask = uploadBytesResumable(storageRef, blob);

//     // listen for events
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         setProgress(progress.toFixed());
//       },
//       (error) => {
//         // handle error
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//           console.log("File available at", downloadURL);
//           // save record
//           await saveRecord(fileType, downloadURL, new Date().toISOString());
//           setImage("");
//           setVideo("");
//         });
//       }
//     );
//   }

//   async function saveRecord(fileType, url, createdAt) {
//     try {
//       const docRef = await addDoc(collection(db, "files"), {
//         fileType,
//         url,
//         createdAt,
//       });
//       console.log("document saved correctly", docRef.id);
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={files}
//         keyExtractor={(item) => item.url}
//         renderItem={({ item }) => {
//           if (item.fileType === "image") {
//             return (
//               <Image
//                 source={{ uri: item.url }}
//                 style={{ width: "34%", height: 100 }}
//               />
//             );
//           } else {
//             return (
//               <Video
//                 source={{
//                   uri: item.url,
//                 }}
//                 // videoStyle={{ borderWidth: 1, borderColor: "red" }}
//                 rate={1.0}
//                 volume={1.0}
//                 isMuted={false}
//                 resizeMode="cover"
//                 shouldPlay
//                 // isLooping
//                 style={{ width: "34%", height: 100 }}
//                 useNativeControls
//               />
//             );
//           }
//         }}
//         numColumns={3}
//         contentContainerStyle={{ gap: 2 }}
//         columnWrapperStyle={{ gap: 2 }}
//       />
//       {image &&
//         (Platform.OS === "ios" ? (
//           <Uploading image={image} video={video} progress={progress} />
//         ) : (
//           // Some features of blur are not available on Android
//           <UploadingAndroid image={image} video={video} progress={progress} />
//         ))}
//       <TouchableOpacity
//         onPress={pickImage}
//         style={{
//           position: "absolute",
//           bottom: 90,
//           right: 30,
//           width: 44,
//           height: 44,
//           backgroundColor: "black",
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: 25,
//         }}
//       >
//         <Ionicons name="image" size={24} color="white" />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={pickVideo}
//         style={{
//           position: "absolute",
//           bottom: 150,
//           right: 30,
//           width: 44,
//           height: 44,
//           backgroundColor: "black",
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: 25,
//         }}
//       >
//         <Ionicons name="videocam" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }





//cara or vedio alow Image upload view++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     Alert,
// } from "react-native";
// import { launchCameraAsync, MediaTypeOptions } from "expo-image-picker";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../firebase";

// export default function AdUploadScreen({ navigation }) {
//     const [restaurantName, setRestaurantName] = useState("");
//     const [foodName, setFoodName] = useState("");
//     const [description, setDescription] = useState("");
//     const [mediaType, setMediaType] = useState("");
//     const [mediaUri, setMediaUri] = useState("");

//     const handleUpload = async () => {
//         if (restaurantName && foodName && description && mediaUri) {
//             try {
//                 // Upload media to Firebase Storage
//                 const storageRef = ref(
//                     storage,
//                     `uploads/${new Date().getTime()}${
//                         mediaType === "image" ? ".jpg" : ".mp4"
//                     }`
//                 );
//                 const uploadTask = uploadBytesResumable(storageRef, mediaUri);

//                 // Listen for upload events
//                 uploadTask.on(
//                     "state_changed",
//                     (snapshot) => {
//                         // Handle upload progress if needed
//                         const progress =
//                             (snapshot.bytesTransferred / snapshot.totalBytes) *
//                             100;
//                         console.log(`Upload is ${progress}% done`);
//                     },
//                     (error) => {
//                         // Handle upload error
//                         console.error("Error uploading media: ", error);
//                     },
//                     async () => {
//                         // Get the download URL of the uploaded media
//                         const downloadURL = await getDownloadURL(
//                             uploadTask.snapshot.ref
//                         );

//                         // Store the data in Firestore
//                         const adsCollection = collection(db, "ads");
//                         const newAd = {
//                             restaurant_name: restaurantName,
//                             food_name: foodName,
//                             description: description,
//                             media_url: downloadURL,
//                         };

//                         // Add a new document to the "ads" collection
//                         const docRef = await addDoc(adsCollection, newAd);

//                         const orderCollection = collection(db, "orders");
//                         const newOrder = {
//                             restaurant_name: restaurantName,
//                             food_name: foodName,
//                             description: description,
//                             media_url: downloadURL,
//                         };

//                         // Add a new document to the "ads" collection
//                         const docRef2 = await addDoc(orderCollection, newOrder);

//                         // Clear the form and media information
//                         setRestaurantName("");
//                         setFoodName("");
//                         setDescription("");
//                         setMediaType("");
//                         setMediaUri("");
//                         Alert.alert(
//                             "Upload Successful",
//                             "Your ad has been uploaded!"
//                         );
//                     }
//                 );
//             } catch (error) {
//                 console.error("Error uploading media: ", error);
//             }
//         } else {
//             Alert.alert("Incomplete Information", "Please fill in all fields.");
//         }
//     };

//     const pickImage = async () => {
//         let result = await launchCameraAsync({
//             mediaTypes: MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [3, 4],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             setMediaUri(result.uri);
//             setMediaType("image");
//         }
//     };

//     const pickVideo = async () => {
//         let result = await launchCameraAsync({
//             mediaTypes: MediaTypeOptions.Videos,
//             allowsEditing: true,
//             aspect: [3, 4],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             setMediaUri(result.uri);
//             setMediaType("video");
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Upload Advertisement</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Restaurant Name"
//                 value={restaurantName}
//                 onChangeText={(text) => setRestaurantName(text)}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Food Name"
//                 value={foodName}
//                 onChangeText={(text) => setFoodName(text)}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Description"
//                 multiline
//                 value={description}
//                 onChangeText={(text) => setDescription(text)}
//             />
//             {mediaUri ? (
//                 mediaType === "image" ? (
//                     <Image source={{ uri: mediaUri }} style={styles.image} />
//                 ) : (
//                     <Video
//                         source={{ uri: mediaUri }}
//                         style={styles.video}
//                         resizeMode="cover"
//                         shouldPlay
//                         useNativeControls
//                     />
//                 )
//             ) : (
//                 <View style={styles.uploadButtonContainer}>
//                     <TouchableOpacity
//                         style={styles.uploadButton}
//                         onPress={pickImage}
//                     >
//                         <Text style={styles.uploadButtonText}>
//                             Take a Picture
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={styles.uploadButton}
//                         onPress={pickVideo}
//                     >
//                         <Text style={styles.uploadButtonText}>
//                             Record a Video
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//             <Button title="Upload Ad" color="#FF724C" onPress={handleUpload} />
//             <Button
//                 title="Order Now"
//                 onPress={() => {
//                     navigation.navigate("OrderForm");
//                 }}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         marginBottom: 20,
//     },
//     input: {
//         borderBottomWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//         marginBottom: 10,
//     },
//     image: {
//         width: "100%",
//         height: 200,
//         marginBottom: 10,
//     },
//     video: {
//         width: "100%",
//         height: 200,
//         marginBottom: 10,
//     },
//     uploadButtonContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     uploadButton: {
//         flex: 1,
//         backgroundColor: "#FF724C",
//         padding: 10,
//         borderRadius: 5,
//         alignItems: "center",
//         marginHorizontal: 5,
//     },
//     uploadButtonText: {
//         color: "white",
//     },
// });
