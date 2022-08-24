import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyCRkBbA-slUNFaK19Jb830L8Mv9C65cDGI",
  authDomain: "fitex-c73b4.firebaseapp.com",
  databaseURL: "https://fitex-c73b4-default-rtdb.firebaseio.com",
  projectId: "fitex-c73b4",
  storageBucket: "fitex-c73b4.appspot.com",
  messagingSenderId: "908107679620",
  appId: "1:908107679620:web:9c7e3b7553f4dcbc3dbfd1"
})

// Initialize Firebase
export const auth = app.auth()

export default app

