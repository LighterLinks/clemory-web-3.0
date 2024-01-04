import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyB0NcfuQ3FGr6tT219E3EZzGXwkGDu9DTE",
	authDomain: "zeti-e9612.firebaseapp.com",
	projectId: "zeti-e9612",
	storageBucket: "zeti-e9612.appspot.com",
	messagingSenderId: "70877240707",
	appId: "1:70877240707:web:d1acb36a4d18bbbe432ab6"
};

export default function initializeFirebase () {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
}