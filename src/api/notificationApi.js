// src/api/notificationApi.js

export const saveFCMTokenAPI = async (userId, fcmToken) => {
  try {
    // 5000 ya 5001 (jo bhi aapne backend mein rakha ho)
    const response = await fetch("https://wingmann.onrender.com/api/notifications/save-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, fcmToken }),
    });
    return await response.json();
  } catch (error) {
    console.error("❌ API Error saving token:", error);
    throw error;
  }
};