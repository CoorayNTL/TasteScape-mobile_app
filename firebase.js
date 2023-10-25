import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD5LdP7NoxR8UINZChUJbi78dFp-_WDAqw",
    authDomain: "food-app-979ef.firebaseapp.com",
    projectId: "food-app-979ef",
    storageBucket: "food-app-979ef.appspot.com",
    messagingSenderId: "373627899061",
    appId: "1:373627899061:web:c975dd239549360e1882fc",
    // apiKey: "AIzaSyBZmbVu4XeuIKXyyeLt11P_veYHsuThKkY",
    // authDomain: "tasetscape.firebaseapp.com",
    // projectId: "tasetscape",
    // storageBucket: "tasetscape.appspot.com",
    // messagingSenderId: "587385352342",
    // appId: "1:587385352342:web:f3143cf3bfea0fcee952b7",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);
const storage = getStorage(app);

const runTransaction = (db, callback) => {
    return db.runTransaction(callback);
};

export { auth, db, storage, runTransaction };


