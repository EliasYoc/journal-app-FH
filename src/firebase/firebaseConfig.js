// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALYNIwTTGonmPQlSYKNaiZbsOIGVcUDWA",
  authDomain: "fh-curso.firebaseapp.com",
  projectId: "fh-curso",
  storageBucket: "fh-curso.appspot.com",
  messagingSenderId: "665950526380",
  appId: "1:665950526380:web:0fbb3b5e29245d179af809",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export { db, googleProvider, auth };
