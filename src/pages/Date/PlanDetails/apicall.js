import axiosInstance from "../../../api/axiosInstance";


const fetchdateRequestdata = async (senderId, receiverId) => {
  try {

    const response = await axiosInstance.get(
      "/date-request/specific-receiver-data",
      {
        params: {
          senderId,
          receiverId
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error("API Error:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong"
    };
  }
};

const Confirmdate = async (dateRequestId, status) => {
  try {

    const response = await axiosInstance.patch(
      `date-request/update/${dateRequestId}`,
      { status: status }
    );

    return response.data;

  } catch (error) {

    console.error("API Error:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong"
    };
  }
};

export { fetchdateRequestdata, Confirmdate };