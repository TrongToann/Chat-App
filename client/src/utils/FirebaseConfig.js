import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLl_D92fnEXJScLPiTU99mIXWnt1sP2uQ",
  authDomain: "exefpt.firebaseapp.com",
  projectId: "exefpt",
  storageBucket: "exefpt.appspot.com",
  messagingSenderId: "1027769877087",
  appId: "1:1027769877087:web:1ec137863f93fab040d1ea",
  measurementId: "G-0JLGV4D7B8",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
