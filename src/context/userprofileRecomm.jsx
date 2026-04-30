import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosInstance from "../api/axiosInstance";

const RecommendedProfileContext = createContext();

export const RecommendedProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const fetchRecommendedProfiles = useCallback(async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      const res = await axiosInstance.get(
        `user-profile-recommendation/${userId}`,
      );
      console.log('profile Rec : ', res.data);

      setProfiles(res.data.users   || []);
      setQuizComplete(res.data.quizComplete);
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
        fetchRecommendedProfiles,
        quizComplete,
      }}
    >
      {children}
    </RecommendedProfileContext.Provider>
  );
};

export const useRecommendedProfiles = () =>
  useContext(RecommendedProfileContext);
