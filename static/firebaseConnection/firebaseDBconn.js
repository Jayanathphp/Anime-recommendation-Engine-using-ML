//  Firebase configuration with project's configuration
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDoEKEXg6NVGIbEqQWvFOnVmNPvSBExssc",
  authDomain: "anime-b0990.firebaseapp.com",
  projectId: "anime-b0990",
  storageBucket: "anime-b0990.appspot.com",
  messagingSenderId: "857626932604",
  appId: "1:857626932604:web:16dc763b6913a92e27a0f9",
  measurementId: "G-0776PXY80K",
};

const app = initializeApp(firebaseConfig);

const connectDB = getDatabase();
//for firebase authentication
export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
};

// Real-time database
export { connectDB, ref, get, set, child, update, remove };
