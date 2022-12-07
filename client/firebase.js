// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCH-8vJ9BYwgBLGXXWrx5mO3Qff1kWTzpI",
  authDomain: "kvasir-5bc41.firebaseapp.com",
  projectId: "kvasir-5bc41",
  storageBucket: "kvasir-5bc41.appspot.com",
  messagingSenderId: "339657070876",
  appId: "1:339657070876:web:502a78e6334519df55c2d9",
  measurementId: "G-45EM8TKG1J"
});

// Initialize Firebase
const db = firebaseApp.firestore();
export default db;
const messaging = getMessaging(firebaseApp);
const analytics = getAnalytics(firebaseApp);