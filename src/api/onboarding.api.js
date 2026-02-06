// src/api/onboarding.api.js

import axiosInstance from "./axiosInstance";
import { getToken } from "../utils/token";

/**
 * Save onboarding data (partial or full)
 * @param {Object} payload
 */
export const saveOnboardingData = (payload) => {
  return axiosInstance.post("/userData/create", payload);
};

/**
 * Get full onboarding data (for last screen)
 */
export const getOnboardingData = () => {
  return axiosInstance.get("/userData/create");
};


export const uploadUserImages = (formData) => {
  const token = getToken(); // ✅ Get the token directly
  return axiosInstance.post("/userData/upload-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}` // ✅ Manually pass it to be 100% sure
    },
  });
};