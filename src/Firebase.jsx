
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEWLjuLdpvGvWcdPTA_BDwAT3PLvh5Vn0",
  authDomain: "protein-tracker-f429e.firebaseapp.com",
  projectId: "protein-tracker-f429e",
  storageBucket: "protein-tracker-f429e.firebasestorage.app",
  messagingSenderId: "715206730169",
  appId: "1:715206730169:web:b404998c0269afdf7c1668",
  measurementId: "G-56LH6S7XPL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

