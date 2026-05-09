import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0E4b50633D4b-dbK8qnabq6umfCmTdYI",
  authDomain: "https://goiust.firebaseapp.com",
  projectId: "goiust",
  storageBucket: "https://goiust.firebasestorage.app",
  messagingSenderId: "335512190298",
  appId: "1:335512190298:web:f8974a98a0c5c4e4cc0763",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
