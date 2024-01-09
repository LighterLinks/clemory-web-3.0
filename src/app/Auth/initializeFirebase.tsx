import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB0NcfuQ3FGr6tT219E3EZzGXwkGDu9DTE",
  authDomain: "zeti-e9612.firebaseapp.com",
  projectId: "zeti-e9612",
  storageBucket: "zeti-e9612.appspot.com",
  messagingSenderId: "70877240707",
  appId: "1:70877240707:web:d1acb36a4d18bbbe432ab6",

  // clemory firebase
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: "clemory.firebaseapp.com",
  // projectId: "clemory",
  // storageBucket: "clemory.appspot.com",
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export default function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}
