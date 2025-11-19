/**
 * Nobel Quest - Firebase Configuration
 * 
 * This file initializes Firebase for all Nobel Quest games.
 * Replace the placeholder values with your actual Firebase project credentials.
 * 
 * To get these values:
 * 1. Go to https://console.firebase.google.com/
 * 2. Select your project
 * 3. Click on the gear icon > Project settings
 * 4. Scroll down to "Your apps" > Web app > Firebase SDK snippet
 */

// shared/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Din config
const firebaseConfig = {
  apiKey: "AIzaSyCj1HA3GdmlGKk-3-RBDSts67LUBHZ5ooM",
  authDomain: "nobel-quest.firebaseapp.com",
  projectId: "nobel-quest",
  storageBucket: "nobel-quest.firebasestorage.app",
  messagingSenderId: "331208112174",
  appId: "1:331208112174:web:88a60b05a2c1906172c7bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth och Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Google provider
const provider = new GoogleAuthProvider();

// Exportera för användning i andra filer
export { app, auth, db, provider, signInWithPopup, signOut };