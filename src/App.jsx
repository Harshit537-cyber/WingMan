import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import AppRoutes from './routes/AppRoutes'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Splash Screen Timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // 2. 🔥 FIREBASE SERVICE WORKER REGISTRATION
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js") // Ye file public folder mein honi chahiye
        .then((registration) => {
          console.log("✅ Wingmann SW registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("❌ Service Worker registration failed:", error);
        });
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <SplashScreen /> : <AppRoutes />}
    </>
  );
}

export default App;