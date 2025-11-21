// File: src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

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

// Limpiar storageBucket: quitar gs:// y barras finales
if (firebaseConfig.storageBucket) {
  let cleaned = firebaseConfig.storageBucket;
  // Quitar prefijo gs://
  if (cleaned.startsWith('gs://')) {
    cleaned = cleaned.replace('gs://', '');
  }
  // Quitar todas las barras finales
  while (cleaned.endsWith('/')) {
    cleaned = cleaned.slice(0, -1);
  }
  if (cleaned !== firebaseConfig.storageBucket) {
    console.log('⚠️ Storage Bucket limpiado:', firebaseConfig.storageBucket, '→', cleaned);
    firebaseConfig.storageBucket = cleaned;
  }
}

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
let auth;

try {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
  auth = getAuth(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase:', error);
  storage = null;
  auth = null;
}

// Get a reference to the storage service and export it
export { storage, auth };
