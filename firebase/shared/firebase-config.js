export const firebaseConfig = {
  apiKey: "AIzaSyCj1HA3GdmlGKk-3-RBDSts67LUBHZ5ooM",
  authDomain: "nobel-quest.firebaseapp.com",
  projectId: "nobel-quest",
  storageBucket: "nobel-quest.firebasestorage.app",
  messagingSenderId: "331208112174",
  appId: "1:331208112174:web:88a60b05a2c1906172c7bf",
  measurementId: "G-21YT80GHB8"
};

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase.js";

async function testWrite() {
  await addDoc(collection(db, "test"), {
    message: "Hello Firestore",
    time: Date.now()
  });
}

testWrite();

