import { createContext, useContext, useState, useEffect , useCallback} from "react";
import axiosInstance from "../api/axiosInstance";

const RecommendedProfileContext = createContext();

export const RecommendedProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

 const fetchRecommendedProfiles = useCallback(async () => {
  try {
    setLoading(true);

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);


    const res = await axiosInstance.get(`user-profile-recommendation/${user._id}`);
    console.log(res.data)

    setProfiles(res.data.users || []);
  } catch (error) {
    console.error("Error fetching recommended profiles", error);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
      fetchRecommendedProfiles();
    }, [fetchRecommendedProfiles]);
  return (
    <RecommendedProfileContext.Provider
      value={{
        profiles,
        loading,
        fetchRecommendedProfiles
      }}
    >
      {children}
    </RecommendedProfileContext.Provider>
  );
};

export const useRecommendedProfiles = () =>
  useContext(RecommendedProfileContext);