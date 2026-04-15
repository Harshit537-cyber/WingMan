import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const myUserId = user?._id ? String(user._id) : null;
  const myUserName = user?.name ? String(user.name) : null;
  const [incomingCall, setIncomingCall] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!myUserId) return;

    // Register immediately when app loads (not just on /call page)
    socket.emit("register", myUserId);


    // Re-register if socket reconnects
    const onConnect = () => {
   
      socket.emit("register", myUserId);
    };

    // This fires on ANY page — receiver will always catch this
    const onIncomingCall = ({
      fromUserId,
      fromUserName,
      profilePic,
      channelName,
    }) => {
      console.log("📞 Incoming call from:", fromUserName);

      setIncomingCall({
        fromUserId,
        fromUserName,
        profilePic,
        channelName,
      });

      navigate("/call");
    };

    socket.on("connect", onConnect);
    socket.on("incoming:call", onIncomingCall);
    return () => {
      socket.off("connect", onConnect);
      socket.off("incoming:call", onIncomingCall);
    };
  }, [myUserId]);

  return (
    <SocketContext.Provider
      value={{ socket, incomingCall, setIncomingCall, myUserId, myUserName }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
