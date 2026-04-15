import axiosInstance from "./axiosInstance";

export const submitFeedback = async (data) => {
  try {
 

    const response = await axiosInstance.post("/feedback/create", {
      userDataId: data?.userDataId,
      type: data?.type,
      message: data?.message,
    });

  

    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response.data };
    }
  } catch (error) {
    console.error("❌ API Error:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit feedback",
    };
  }
};
