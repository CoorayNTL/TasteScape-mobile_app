
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5LdP7NoxR8UINZChUJbi78dFp-_WDAqw",
  authDomain: "food-app-979ef.firebaseapp.com",
  projectId: "food-app-979ef",
  storageBucket: "food-app-979ef.appspot.com",
  messagingSenderId: "373627899061",
  appId: "1:373627899061:web:c975dd239549360e1882fc"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};