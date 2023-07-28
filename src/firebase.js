// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage  } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_-x9_fvH08nrsF6ogCrRg6YUw68RVM0k",
  authDomain: "olx-react-ebb43.firebaseapp.com",
  projectId: "olx-react-ebb43",
  storageBucket: "olx-react-ebb43.appspot.com",
  messagingSenderId: "839515741997",
  appId: "1:839515741997:web:73a5d5e9357c796fa97da4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
