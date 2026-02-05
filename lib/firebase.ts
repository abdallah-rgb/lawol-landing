import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC44jKT8UyEtrWfUN2YxgEvsaiwSBLA7O4",
  authDomain: "lawol-web.firebaseapp.com",
  projectId: "lawol-web",
  storageBucket: "lawol-web.firebasestorage.app",
  messagingSenderId: "79301199372",
  appId: "1:79301199372:web:58864de0a2be89a0949029",
  measurementId: "G-QX0L8CHBYS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally (only on client side and if supported)
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
