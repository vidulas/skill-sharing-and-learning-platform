// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD8HbREyHLGu1QYjX7BWp2W2UdATx-zQfQ",
  authDomain: "oauth-82a62.firebaseapp.com",
  projectId: "oauth-82a62",
  storageBucket: "oauth-82a62.firebasestorage.app",
  messagingSenderId: "982719200839",
  appId: "1:982719200839:web:5ff792efec15e7bf827b62",
  measurementId: "G-HPY217G6ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // 👈 export auth instance