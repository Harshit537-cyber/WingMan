importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD_GgWU2gjS06blWUNdLXfhWyh-QZGBfrI",
  authDomain: "wingmann-9d804.firebaseapp.com",
  projectId: "wingmann-9d804",
  storageBucket: "wingmann-9d804.firebasestorage.app",
  messagingSenderId: "693887690082",
  appId: "1:693887690082:web:1392bac0d422797215783b", // ✅ FIXED
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


// ✅ Background Notification
messaging.onBackgroundMessage((payload) => {
  console.log("Background Message received: ", payload);

  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: "/logo192.png",
    data: payload?.data, // 🔥 IMPORTANT (for navigation)
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// ✅ Handle Notification Click (🔥 VERY IMPORTANT)
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const data = event.notification.data;

  let url = "/";

  // 🔥 Routing logic
  if (data?.type === "call_request_create") {
    url = "/Request";
  }

  if (data?.type === "date_request_create") {
    url = "/Request";
  }

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});