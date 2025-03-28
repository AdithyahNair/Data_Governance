import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase with a custom auth domain based on the current environment
const app = initializeApp({
  ...firebaseConfig,
  // Use the current domain for auth in development
  authDomain: window.location.hostname === 'localhost' 
    ? window.location.hostname 
    : firebaseConfig.authDomain
});

export const auth = getAuth(app);

// Use auth emulator in development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('webcontainer.io')) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}