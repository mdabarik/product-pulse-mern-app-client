// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPeM1P_HXuPWe6CUYzXbcsRRUbSN96ikg",
  authDomain: "product-pulse-web-app.firebaseapp.com",
  projectId: "product-pulse-web-app",
  storageBucket: "product-pulse-web-app.appspot.com",
  messagingSenderId: "874528230471",
  appId: "1:874528230471:web:c542277ed634ecb96a3562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;