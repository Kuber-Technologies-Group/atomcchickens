
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDggDsSHJZmX_7Xww9GItdAZpS8UBhp7NQ",
  authDomain: "atomcchickens-47ead.firebaseapp.com",
  projectId: "atomcchickens-47ead",
  storageBucket: "atomcchickens-47ead.firebasestorage.app",
  messagingSenderId: "239995629935",
  appId: "1:239995629935:web:7d3882f63e0d12ebd7789a",
  measurementId: "G-M2XE2K1T3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
