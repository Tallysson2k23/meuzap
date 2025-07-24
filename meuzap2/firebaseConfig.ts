// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // 🔄 Corrigido aqui
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuNE38hOn4pUbXc3ykXSS4CjwcY2zURyY",
  authDomain: "meuzap-15748.firebaseapp.com",
  databaseURL: "https://meuzap-15748-default-rtdb.firebaseio.com",
  projectId: "meuzap-15748",
  storageBucket: "meuzap-15748.appspot.com",
  messagingSenderId: "894580582113",
  appId: "1:894580582113:web:eafb5b5521a82f5adef9a0",
  measurementId: "G-ENWJJ629K3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);        // 🔄 Sem getReactNativePersistence
const db = getFirestore(app);

export { auth, db };
