import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD_GgWU2gjS06blWUNdLXfhWyh-QZGBfrI",
  authDomain: "wingmann-9d804.firebaseapp.com",
  projectId: "wingmann-9d804",
  storageBucket: "wingmann-9d804.firebasestorage.app",
  messagingSenderId: "693887690082",
  appId: "1:693887690082:web:1392bac0d422797215783b",
  measurementId: "G-4QLKVSMFTB"
};

const app = initializeApp(firebaseConfig);

export const getFCMToken = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("❌ FCM is not supported in this browser.");
      return null;
    }

    const messaging = getMessaging(app);

    // Notification permission maangein
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("❌ Notification permission denied.");
      return null;
    }

    // Token generate karein
    const token = await getToken(messaging, {
      vapidKey: "BHa43mk1s3dOQMwWcK0c3N13KHxp-3QPU5lJtHc3mKPbbDbiqov076xIh44EhqgmzoDJmpD9qovXqPtcoBDkn7A",
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