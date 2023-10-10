// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoL15q3fZ6adFzjxleuWXW5SFsRMEUClg",
  authDomain: "my-ecommerce-8eafa.firebaseapp.com",
  projectId: "my-ecommerce-8eafa",
  storageBucket: "my-ecommerce-8eafa.appspot.com",
  messagingSenderId: "126288098313",
  appId: "1:126288098313:web:476c07ce8d3268cc3674d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
