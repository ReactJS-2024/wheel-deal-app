// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; // import-ujemo auth modul iz firebase-a da bismo mogli da ga koristimo u React app
import {getFirestore} from 'firebase/firestore'; // import-ujemo firestore modul
import {getStorage} from 'firebase/storage'; // importujemo storage modul

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
  // databaseURL: process.env.REACT_APP_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ovde pravimo uz getAuth metodu za nas app instancu auth modula
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};
