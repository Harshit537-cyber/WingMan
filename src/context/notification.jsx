import React, { createContext, useContext, useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase"; 
import axiosInstance from "../api/axiosInstance";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // ✅ fetch from backend
  const fetchUnReadNotifi = async () => {
    try {
     
      const userId = localStorage.getItem("userId");



      const res = await axiosInstance.get(`/get-Unread-Notfi/${userId}`);


      setUnreadCount(res?.data?.count || 0);
      setNotifications(res?.data?.notifications || []);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {


    const timer = setTimeout(() => {
 
      fetchUnReadNotifi();
    }, 5000);

    const unsubscribe = onMessage(messaging, (payload) => {
   

      const newNotification = {
        _id: payload?.data?.notificationId || Date.now(),
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        data: payload?.data,
        isRead: false,
        createdAt: new Date(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
        notifications,
        setNotifications,
        fetchUnReadNotifi, // ✅ exposed
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);