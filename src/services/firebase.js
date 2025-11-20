// File: src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration from environment variables
// Note: In Gatsby, client-exposed env vars must be prefixed with GATSBY_
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
};

// Debug logging (solo en desarrollo o para debugging)
console.log('🔥 Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasProjectId: !!firebaseConfig.projectId,
  hasStorageBucket: !!firebaseConfig.storageBucket,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
});

// Verificar que las variables estén disponibles
if (!firebaseConfig.apiKey || !firebaseConfig.storageBucket) {
  console.error('❌ Firebase configuration is incomplete!', {
    apiKey: firebaseConfig.apiKey ? 'present' : 'MISSING',
    storageBucket: firebaseConfig.storageBucket ? 'present' : 'MISSING'
  });
}

// Initialize Firebase
let app;
let storage;

try {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase:', error);
  storage = null;
}

// Get a reference to the storage service and export it
export { storage };
