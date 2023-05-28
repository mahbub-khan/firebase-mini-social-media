// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCglIgYR9VPCwNIiZV5cnpJ9b_p0w9MeeE",
  authDomain: "mini-social-media-project.firebaseapp.com",
  projectId: "mini-social-media-project",
  storageBucket: "mini-social-media-project.appspot.com",
  messagingSenderId: "272722788699",
  appId: "1:272722788699:web:3f689536711c6a37f05a7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
