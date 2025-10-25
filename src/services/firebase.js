// File: src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSDB_Gt9FFY9tdeJoJ_PoHQy0txv4P46U",
  authDomain: "voces-de-esperanza-mx.firebaseapp.com",
  projectId: "voces-de-esperanza-mx",
  storageBucket: "voces-de-esperanza-mx.firebasestorage.app",
  messagingSenderId: "1047539382029",
  appId: "1:1047539382029:web:21438fe176ca569ab76244",
  measurementId: "G-DTWME2YN7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service and export it
export const storage = getStorage(app);
