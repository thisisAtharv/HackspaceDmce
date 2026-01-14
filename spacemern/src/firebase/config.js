import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBgZ9JY0recgYcrJgJX9mMKRD3Wive4iuM",
  authDomain: "spacescope-7dc7c.firebaseapp.com",
  projectId: "spacescope-7dc7c",
  storageBucket: "spacescope-7dc7c.firebasestorage.app",
  messagingSenderId: "473059947622",
  appId: "1:473059947622:web:ca2ef6e987bea63a9ea9a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
