// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzK5nkIITELWFls_3pO4R1g-h6wDoCxIA",
  authDomain: "busy-buy-3a306.firebaseapp.com",
  databaseURL: "https://busy-buy-3a306-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "busy-buy-3a306",
  storageBucket: "busy-buy-3a306.appspot.com",
  messagingSenderId: "419243436853",
  appId: "1:419243436853:web:3b620719b3df2b1b7c7a7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);