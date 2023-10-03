import { initializeApp } from "firebase/app";
import { getFirestore } from "@react-native-firebase/firestore"
import { getStorage } from "@firebase/storage"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBkyP5notmdNjfwbpkkx6pSTwOhpzZ8wSc",
    authDomain: "foodapp1-9f48c.firebaseapp.com",
    projectId: "foodapp1-9f48c",
    storageBucket: "foodapp1-9f48c.appspot.com",
    messagingSenderId: "379471778077",
    appId: "1:379471778077:web:7d32cdf7d49e6daa0c51f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)

export { db, storage, auth};