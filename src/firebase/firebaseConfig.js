// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlu186HCF_5FfWTvzvPpJfGzPhdxBnxoI",
  authDomain: "authpratice361.firebaseapp.com",
  projectId: "authpratice361",
  storageBucket: "authpratice361.appspot.com",
  messagingSenderId: "45815411737",
  appId: "1:45815411737:web:1d239146ad90c2d883a688",
  measurementId: "G-XLE9JXTJZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app