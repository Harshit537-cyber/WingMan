import axiosInstance from "../../../api/axiosInstance";


export const fetchdata = async (date) => {
  try {
    console.log("date:", date);

    const res = await axiosInstance.get(
      `getAllAvailabilityByDate?date=${date}`
    );
    console.log(res.data)
    return res.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};