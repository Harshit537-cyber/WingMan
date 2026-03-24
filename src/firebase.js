import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axiosInstance from "./api/axiosInstance";
//import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmgUscKRnBUw6Z4nIuKdQfbQTkwuPo8D0",
  authDomain: "wingmann-authentication.firebaseapp.com",
  projectId: "wingmann-authentication",
  storageBucket: "wingmann-authentication.firebasestorage.app",
  messagingSenderId: "66192972723",
  appId: "1:66192972723:web:0c7409473e55985e9189c6",
  measurementId: "G-S5GW2R9FJH",
};

const app = initializeApp(firebaseConfig);

// ✅ AUTH setup
export const auth = getAuth(app);

// ✅ Google Login function
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // console.log("✅ User:", result.user);
    // return result.user;

    const user = result.user;
    const email = user.email;

    // 🔥 Call backend to check if user already exists
    const res = await axiosInstance.post("check", {
      email,
    });

    const data = await res.data;
    console.log("dta ", data);

    if (!data.exists) {
      // ❌ User not registered → block flow
      // alert("User not registered. Please sign up first.");
      console.log("✅ User:", user);
      return user;

      // Optional: logout from firebase
      // await auth.signOut();

      // return null;
    }else{
     alert("This Email is Already Registered, Please Login");
    }

    // ✅ User exists → continue
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
      vapidKey:
        "BE4pErl4UEULunN39fdmpJHldfhwslUGkBOG3nx4rxb0TcxLgfrcgilDiZNThepecdAGAFDigU-N55lfUBXd66A",
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


export const loginWithGoogle = async ({
  fetchUser,
  fetchRecommendedProfiles,
  fetchCallRequests,
  navigate,
  isProfileComplete
}) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const email = user.email;

    // 🔥 Step 1: Check if user exists
    const checkRes = await axiosInstance.post("/check", { email });
    const data = checkRes.data;

    if (data.exists) {
      console.log("✅ User exists, logging in...");

      // 🔥 Step 2: Call your existing login API
      const res = await axiosInstance.post("/user/login", {
        email,
      });

      if (res.data.success) {
        const loggedInUser = res.data.user;

        // ✅ Save token + user
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        // ✅ Call your existing functions
        await fetchUser();
        await fetchRecommendedProfiles();
        await fetchCallRequests();

        // ✅ Navigation (same as your logic)
        if (isProfileComplete(loggedInUser)) {
          navigate("/home");
        } else {
          navigate("/uploads");
        }
      }

    } else {
      // ❌ Not registered
      alert("User not registered. Please sign up first.");

      await auth.signOut();
    }

  } catch (error) {
    console.error("❌ Google Login Error:", error);
  }
};
export const messaging = getMessaging(app);
