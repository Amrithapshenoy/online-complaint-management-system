import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1xWOIlQoFZyfnnaSqvPAv4lV2Z2UZr7s",
  authDomain: "complaint-management-28a9f.firebaseapp.com",
  projectId: "complaint-management-28a9f",
  storageBucket: "complaint-management-28a9f.firebasestorage.app",
  messagingSenderId: "7169740717",
  appId: "1:7169740717:web:4132efbcfaca1388fb5b24",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const firestoreDb = getFirestore(firebaseApp);

export { firebaseApp, auth, firestoreDb };