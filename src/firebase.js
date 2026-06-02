import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRB15tl6a8QJgbY0082Dno_6zoNw37wSQ",
  authDomain: "fleetsync-pro.firebaseapp.com",
  projectId: "fleetsync-pro",
  storageBucket: "fleetsync-pro.firebasestorage.app",
  messagingSenderId: "731566277004",
  appId: "1:731566277004:web:f8136cb471ae3cba2856a9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);