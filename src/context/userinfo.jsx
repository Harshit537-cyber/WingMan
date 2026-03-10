import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avator, setAvator] = useState([]);
  const [quiz, setQuiz] = useState(false);
  const [callrequest, setcallsequest] = useState([])
  const [daterequest, setDaterequest] = useState([])
  console.log(daterequest)

  // ✅ Fetch user
  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);
     
      const storedUser = localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);
   

      const res = await axiosInstance.get(`users/${user._id}`);
      setUser(res.data.user);
      console.log(res.data)
      setAvator(res.data.avatar)
      setQuiz(res.data.quiz)
      setUser(res?.data?.data);
      setcallsequest(res?.data?.call_request);
      setDaterequest(res?.data?.date_request)
    } catch (error) {
      console.error("Fetch user error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Auto fetch on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        avator,
        setUser,
        quiz,
        fetchUser, // 👈 you can call this anywhere to re-fetch
        loading,
        callrequest,
        daterequest
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
