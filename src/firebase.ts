
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfDKvZfnffGCvy2kN4UoWJVjvkTHssgQI",
  authDomain: "aca-quiz-dba69.firebaseapp.com",
  projectId: "aca-quiz-dba69",
  storageBucket: "aca-quiz-dba69.appspot.com",
  messagingSenderId: "85958719708",
  appId: "1:85958719708:web:9cd83049419ca505181c19",
  measurementId: "G-NPTP509PF8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
