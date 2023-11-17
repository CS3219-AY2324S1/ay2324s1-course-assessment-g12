// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj8gXc0R7QHQMSn65yFP_zGEf2b2bm4cI",
  authDomain: "peerprep-group12.firebaseapp.com",
  projectId: "peerprep-group12",
  storageBucket: "peerprep-group12.appspot.com",
  messagingSenderId: "872658788442",
  appId: "1:872658788442:web:b3edcc758b6a83cf4c3863",
  measurementId: "G-4X0DCVFCZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
const analytics = getAnalytics(app);


