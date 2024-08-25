/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:39 AM - 24/08/2024
 * User: lam-nguyen
 **/
import { getAuth } from "@react-native-firebase/auth";
import { initializeApp } from "@react-native-firebase/app";

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
	appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID as string,
	androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
	projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID as string,
	storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
	clientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
	messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

initializeApp(firebaseConfig);
const firebaseAuth = getAuth();
firebaseAuth.setLanguageCode("VN").then();

export { firebaseAuth };
