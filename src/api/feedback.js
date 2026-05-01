// src/api/demographicsApi.js
// import axiosInstance from './axiosInstance';

// export const postfeedback = async () => {
//   try {
//     const response = await axiosInstance.post('/feedback/create');
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching demographic analytics:", error);
//     throw error;
//   }
// };


import axiosInstance from './axiosInstance';

export const postfeedback = async (data) => {
  try {
    const response = await axiosInstance.post('/feedback/create', data);
    return response.data;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};