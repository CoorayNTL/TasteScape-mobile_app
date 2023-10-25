// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2ERF6uLiGM89M_oqMv9BDf7jZ--AMnMI",
  authDomain: "tastescape-65981.firebaseapp.com",
  projectId: "tastescape-65981",
  storageBucket: "tastescape-65981.appspot.com",
  messagingSenderId: "855329290891",
  appId: "1:855329290891:web:288337085fa256a171328e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}