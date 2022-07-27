import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDbQF2Aj3OjMzc8ZTKnsvZOxU0f-Zj0vKI",
    authDomain: "esc-hotel-project.firebaseapp.com",
    projectId: "esc-hotel-project",
    storageBucket: "esc-hotel-project.appspot.com",
    messagingSenderId: "82779539289",
    appId: "1:82779539289:web:625ba240d80b2cb921ae48"
  };
  
  
const firebaseApp=firebase.initializeApp(firebaseConfig);

export default firebaseApp;