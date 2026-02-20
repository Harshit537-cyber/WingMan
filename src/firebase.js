import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
//import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBmgUscKRnBUw6Z4nIuKdQfbQTkwuPo8D0",
  authDomain: "wingmann-authentication.firebaseapp.com",
  projectId: "wingmann-authentication",
  storageBucket: "wingmann-authentication.firebasestorage.app",
  messagingSenderId: "66192972723",
  appId: "1:66192972723:web:0c7409473e55985e9189c6",
  measurementId: "G-S5GW2R9FJH"
};

const app = initializeApp(firebaseConfig);

// ✅ AUTH setup
export const auth = getAuth(app);

// ✅ Google Login function
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    console.log("✅ User:", result.user);
    return result.user;
  } catch (error) {
    console.error("❌ Google Login Error:", error);
    return null;
  }
};

// ✅ FCM Token function (tumhara existing)
export const getFCMToken = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("❌ FCM is not supported in this browser.");
      return null;
    }

    const messaging = getMessaging(app);

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("❌ Notification permission denied.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: "BE4pErl4UEULunN39fdmpJHldfhwslUGkBOG3nx4rxb0TcxLgfrcgilDiZNThepecdAGAFDigU-N55lfUBXd66A",
    });

    if (token) {
      console.log("✅ FCM TOKEN:", token);
      return token;
    } else {
      console.warn("❌ No registration token available.");
      return null;
    }
  } catch (error) {
    console.error("❌ FCM Token Error:", error);
    return null;
  }
};