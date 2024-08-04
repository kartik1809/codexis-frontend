// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUXDoTLKFSTLkYMqGj5aePYK09emTKu0k",
  authDomain: "codecore-studio.firebaseapp.com",
  projectId: "codecore-studio",
  storageBucket: "codecore-studio.appspot.com",
  messagingSenderId: "1045186419390",
  appId: "1:1045186419390:web:06373eca0f352d56ed1cef",
  measurementId: "G-3NK7RJ7WNW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
