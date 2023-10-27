
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyATuxMFXhU5CtC3bU70I-UGEGSE-1hAeOQ",
  authDomain: "tasatescrap.firebaseapp.com",
  projectId: "tasatescrap",
  storageBucket: "tasatescrap.appspot.com",
  messagingSenderId: "897761939334",
  appId: "1:897761939334:web:b36276fb8cfc1084856607"
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); 

export {auth,db};