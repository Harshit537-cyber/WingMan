// src/api/onboarding.api.js

import axiosInstance from "./axiosInstance";
import { getToken } from "../utils/token";

/**
 * Save onboarding data (partial or full)
 * @param {Object} payload
 */
export const saveOnboardingData = (payload) => {
  return axiosInstance.post("/api/userData/create", payload);
};

/**
 * Get full onboarding data (for last screen)
 */
export const getOnboardingData = () => {
  return axiosInstance.get("/userData/create");
};


export const uploadUserImages = (formData) => {
  const token = getToken(); // ✅ Get the token directly
  return axiosInstance.post("userData/upload-images", formData, { // ✅ Removed leading /
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const savePreferences = (userId, data) => {
  const token = getToken(); // ✅ Get the current token from localStorage
  
  return axiosInstance.post(`preference/create-preference/${userId}`, data, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // ✅ Manually passing the token
    },
  });
};