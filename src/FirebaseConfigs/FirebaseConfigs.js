import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCJ_AG4UUgT1W1mf0L_vYs_mIWOdTdiypM",
    authDomain: "soul-shop-f3fbb.firebaseapp.com",
    projectId: "soul-shop-f3fbb",
    storageBucket: "soul-shop-f3fbb.firebasestorage.app",
    messagingSenderId: "43755424190",
    appId: "1:43755424190:web:1f4785fbb7fef63f3d91ef"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);