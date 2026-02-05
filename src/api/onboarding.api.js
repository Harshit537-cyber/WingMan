// src/api/onboarding.api.js

import axiosInstance from "./axiosInstance";

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
