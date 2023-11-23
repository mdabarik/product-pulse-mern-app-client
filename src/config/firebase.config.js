// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCPeM1P_HXuPWe6CUYzXbcsRRUbSN96ikg",
//   authDomain: "product-pulse-web-app.firebaseapp.com",
//   projectId: "product-pulse-web-app",
//   storageBucket: "product-pulse-web-app.appspot.com",
//   messagingSenderId: "874528230471",
//   appId: "1:874528230471:web:c542277ed634ecb96a3562"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export default app;

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;