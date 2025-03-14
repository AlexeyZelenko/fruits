import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-2qvf4wgkcgpbDyaJu_iLFGkBAZ-QM1g",
  authDomain: "fruits-test-f250a.firebaseapp.com",
  projectId: "fruits-test-f250a",
  storageBucket: "fruits-test-f250a.firebasestorage.app",
  messagingSenderId: "993900687184",
  appId: "1:993900687184:web:431a1b5ff3b5f02b21c655"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);