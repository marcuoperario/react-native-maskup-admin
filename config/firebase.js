import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC8mL_UmZbtnlCOvaAzJZWOZqobDa75-8s",
    authDomain: "maskup-auth.firebaseapp.com",
    projectId: "maskup-auth",
    storageBucket: "maskup-auth.appspot.com",
    messagingSenderId: "452122399720",
    appId: "1:452122399720:web:1e6699edc6957964508a5d",
    measurementId: "G-XK767HKNGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()

//Initialize Firestore
const  db = getFirestore(app)

export { auth, db }