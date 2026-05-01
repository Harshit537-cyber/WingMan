import axiosInstance from "../../../api/axiosInstance";


export const fetchdata = async (date) => {
  try {
    

    const res = await axiosInstance.get(
      `getAllAvailabilityByDate?date=${date}`
    );
  
    return res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};