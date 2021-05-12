import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBid_dmPXZ_z6YYJ6bsKZZZh_EMtN-B0O4",
  authDomain: "sayproject-f28f2.firebaseapp.com",
  projectId: "sayproject-f28f2",
  storageBucket: "sayproject-f28f2.appspot.com",
  messagingSenderId: "290789763902",
  appId: "1:290789763902:web:dcc855fa6bca0fc7fbda6f",
  measurementId: "G-SVZW8LWFRS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a link to firebase database
export const db = firebase.firestore();

// Create a link to firebase authentication
export const fireAuth = firebase.auth();

// Create a reference to firebase storage bucket
export const fireStorage = firebase.storage().ref();
