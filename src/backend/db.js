import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: "url-shortener-c5722",
    storageBucket: "url-shortener-c5722.appspot.com",
    messagingSenderId: "206778862027",
    appId: "1:206778862027:web:2654b59cb80d23f6f4ce4e",
    measurementId: "G-42574XM9CF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
