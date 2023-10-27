// import React, { useEffect, useState } from "react";
// import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// export default function ViewAddDetailsScreen({ route }) {
//   const { adDetails } = route.params;
//   const [adType, setAdType] = useState(null);

//   // Function to fetch the ad type
//   const fetchAdType = async () => {
//     try {
//       const adTypesCollection = collection(db, "adtypes");
//       const adTypesSnapshot = await getDocs(adTypesCollection);

//       // Find the ad type that matches the ad's ad type ID
//       const matchingAdType = adTypesSnapshot.docs.find(
//         (doc) => doc.id === adDetails.ad_type_id
//       );

//       if (matchingAdType) {
//         setAdType(matchingAdType.data());
//       }
//     } catch (error) {
//       console.error("Error fetching ad type:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAdType();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.cardContainer}>
//         <Image source={{ uri: adDetails.media_url }} style={styles.image} />
//         <Text style={styles.title}>{adDetails.restaurant_name}</Text>
//         <Text style={styles.adName}>{adDetails.ad_name}</Text>
//         {adType && (
//           <Text style={styles.adType}>
//             Ad Type: {adType.name} {/* Adjust this based on your data */}

//           </Text>
//         )}
//         <Text style={styles.description}>{adDetails.description}</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     padding: 20,
//   },
//   cardContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   adName: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   adType: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     marginBottom: 10,
//     borderRadius: 10,
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const mockAdDetails = {
    restaurant_name: "Mock Restaurant",
    ad_name: "Mock Ad",
    ad_type_id: "123",
    media_url:
        "https://i.pinimg.com/236x/5a/95/60/5a9560e24ba3d2c9f4b2428a5f848593.jpg",
    description: "This is a mock ad description.",
};

export default function ViewAddDetailsScreen({ route }) {
    const { adDetails } = route.params;
    const [adType, setAdType] = useState(null);

    const fetchAdType = async () => {
        try {
            setAdType({
                name: "Mock Ad Type",
            });
        } catch (error) {
            console.error("Error fetching ad type:", error);
        }
    };

    useEffect(() => {
        fetchAdType();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.cardContainer}>
                <Image
                    source={{ uri: adDetails.media_url }}
                    style={styles.image}
                />
                <Text style={styles.title}>{adDetails.restaurant_name}</Text>
                <Text style={styles.adName}>{adDetails.ad_name}</Text>
                {adType && (
                    <Text style={styles.adType}>Ad Type: {adType.name}</Text>
                )}
                <Text style={styles.description}>{adDetails.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },
    cardContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    adName: {
        fontSize: 18,
        marginBottom: 10,
    },
    adType: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
});
