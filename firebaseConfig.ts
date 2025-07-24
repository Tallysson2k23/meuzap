import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuNE38hOn4pUbXc3ykXSS4CjwcY2zURyY",
  authDomain: "meuzap-15748.firebaseapp.com",
  projectId: "meuzap-15748",
  storageBucket: "meuzap-15748.appspot.com",
  messagingSenderId: "894580582113",
  appId: "1:894580582113:web:eafb5b5521a82f5adef9a0"
  // ❌ Não inclua measurementId
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
