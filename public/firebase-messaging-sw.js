importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD_GgWU2gjS06blWUNdLXfhWyh-QZGBfrI",
  authDomain: "wingmann-9d804.firebaseapp.com",
  projectId: "wingmann-9d804",
  storageBucket: "wingmann-9d804.firebasestorage.app",
  messagingSenderId: "693887690082",
  appId: "1:693887690082:web:1392bac0d422797215783b",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background messages handle karne ke liye
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png", // Apna icon path yahan check kar lena
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});