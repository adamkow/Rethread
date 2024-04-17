//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    
} from "firebase/firestore";
import {getStorage} from "firebase/storage";
    
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtlhR0hU-EnbYrjyMiCz9DjQ-_ZycVF0k",
  authDomain: "rethread-da8fa.firebaseapp.com",
  projectId: "rethread-da8fa",
  storageBucket: "rethread-da8fa.appspot.com",
  messagingSenderId: "1004756336662",
  appId: "1:1004756336662:web:3bc15474c276abcb80b537",
  measurementId: "G-GCGXD8ZTEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
