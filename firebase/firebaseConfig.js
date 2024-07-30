// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBYVwt6wWw5Tv2E4wnakyP2Ca4rf_9fZ-k",
  authDomain: "socialmediaapp-6f773.firebaseapp.com",
  projectId: "socialmediaapp-6f773",
  storageBucket: "socialmediaapp-6f773.appspot.com",
  messagingSenderId: "765933243551",
  appId: "1:765933243551:web:83319fbc3fee562117a6aa",
  measurementId: "G-31KXNS5C46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FireStore = getFirestore(app)
export const usersRef = collection(FireStore,'users')
export const roomsRef = collection(FireStore,'rooms')

export const auth = getAuth(app)
const analytics = getAnalytics(app);