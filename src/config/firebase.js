import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAbSoYn_4JzTJFo6jrsQ8RFdGQwm2TIzEM",
  authDomain: "eli-capstone499.firebaseapp.com",
  projectId: "eli-capstone499",
  storageBucket: "eli-capstone499.appspot.com",
  messagingSenderId: "596871813761",
  appId: "1:596871813761:web:1903d94155ad0338434b80",
  measurementId: "G-L41EGCPLVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app)