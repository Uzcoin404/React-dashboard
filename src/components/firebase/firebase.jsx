import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD16qWNFnlRg4r3LN9eZSO-EcVQm86TrMo",
    authDomain: "firechat-e157a.firebaseapp.com",
    projectId: "firechat-e157a",
    storageBucket: "firechat-e157a.appspot.com",
    messagingSenderId: "1028131822299",
    appId: "1:1028131822299:web:47fe8cfd0029d828068afe",
    measurementId: "G-9E22DH34DF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);