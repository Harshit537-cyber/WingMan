import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import axiosInstance from "../../src/api/axiosInstance";

const CallRequestContext = createContext();

export const CallRequestProvider = ({ children }) => {
  const [callRequests, setcallRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const fetchCallRequests = useCallback(async () => {
    try {
      setLoading(true);

      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      const res = await axiosInstance.get(`/call-request/reciever/${user._id}`);

      setcallRequests(res.data?.data || []);
      console.log(res.data?.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs automatically on refresh / provider mount
  useEffect(() => {
    fetchCallRequests();
  }, [fetchCallRequests]);

  return (
    <CallRequestContext.Provider
      value={{
        callRequests,
        loading,
        fetchCallRequests
      }}
    >
      {children}
    </CallRequestContext.Provider>
  );
};

export const useCallRequests = () => useContext(CallRequestContext);