import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2M0M7H5VxLxbyKTinJBaf9BGn8HtDmAs",
    authDomain: "catmarket-8aa71.firebaseapp.com",
    projectId: "catmarket-8aa71",
    storageBucket: "catmarket-8aa71.firebasestorage.app",
    messagingSenderId: "15731988751",
    appId: "1:15731988751:web:c0c959653b3d4565c3c67a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;