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
  const [callrequest, setcallsequest] = useState([]);
  const [dateaccepted, setDateAccepted] = useState([]);
  console.log(dateaccepted);
  const [requestedDateReq, setRequestedDateReq] = useState([]);
  const [requestedDateSend, setRequestedDateSend] = useState([]);
  const [notification, setNotification] = useState([]);
  const [dateRequest_notifications, setDateRequest_notifications] = useState(
    [],
  );
  const [callRequest_notifications, setCallRequest_notifications] = useState(
    [],
  );

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
      console.log('userConted caled : ',res.data);
      setAvator(res.data.avatar);
      setQuiz(res.data.quiz);
      setUser(res?.data?.data);
      setcallsequest(res?.data?.call_request);
      setDateAccepted(res?.data?.date_accepted);

      setRequestedDateReq(res?.data?.date_requested);
      setRequestedDateSend(res?.data?.date_request_sent);
      setNotification(res?.data?.notifications);
      setDateRequest_notifications(res?.data?.dateRequest_notifications);
      setCallRequest_notifications(res?.data?.callRequest_notifications);
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
        dateaccepted,
        requestedDateReq,
        requestedDateSend,
        notification,
        dateRequest_notifications,
        callRequest_notifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
