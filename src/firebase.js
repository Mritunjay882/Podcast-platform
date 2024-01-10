// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcbB3m_dHp-yPk7mkDZGVmtA-OuFG-0Ac",
    authDomain: "podcast-project-bee0c.firebaseapp.com",
    projectId: "podcast-project-bee0c",
    storageBucket: "podcast-project-bee0c.appspot.com",
    messagingSenderId: "24426062555",
    appId: "1:24426062555:web:a13a94c6be05126d0fe2fe",
    measurementId: "G-JCMKH62LQ4"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app);
const storage= getStorage(app);
const auth=getAuth(app);

export {db,storage,auth};