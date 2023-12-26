// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdJ3XdT3ucqYBHf8bCGa-Q1DpURajrCTk",
  authDomain: "crud-2b648.firebaseapp.com",
  projectId: "crud-2b648",
  storageBucket: "crud-2b648.appspot.com",
  messagingSenderId: "761506331436",
  appId: "1:761506331436:web:1a0ca31569cc97594a0a89",
  measurementId: "G-MLXT1HYEXD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleSignedIn = new GoogleAuthProvider();
export const db = getFirestore(app);
