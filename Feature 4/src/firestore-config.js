// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbQF2Aj3OjMzc8ZTKnsvZOxU0f-Zj0vKI",
    authDomain: "esc-hotel-project.firebaseapp.com",
    projectId: "esc-hotel-project",
    storageBucket: "esc-hotel-project.appspot.com",
    messagingSenderId: "82779539289",
    appId: "1:82779539289:web:625ba240d80b2cb921ae48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
