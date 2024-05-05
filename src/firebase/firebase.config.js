// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5CyP-N1NHt4SijFr4GbLh3cSdgmQDtiM",
  authDomain: "taskify-9ee94.firebaseapp.com",
  projectId: "taskify-9ee94",
  storageBucket: "taskify-9ee94.appspot.com",
  messagingSenderId: "43938798698",
  appId: "1:43938798698:web:3daec72cdf7dfa9fd7be13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth