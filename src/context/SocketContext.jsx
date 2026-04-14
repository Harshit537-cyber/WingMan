import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const myUserId = user?._id ? String(user._id) : null;
  const [incomingCall, setIncomingCall] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!myUserId) return;

    // Register immediately when app loads (not just on /call page)
    socket.emit("register", myUserId);
    console.log("📡 Registered:", myUserId);

    // Re-register if socket reconnects
    const onConnect = () => {
      console.log("🔄 Reconnected, re-registering:", myUserId);
      socket.emit("register", myUserId);
    };

    // This fires on ANY page — receiver will always catch this
    const onIncomingCall = ({ fromUserId, channelName }) => {
      console.log("📞 Incoming call from:", fromUserId);
      setIncomingCall({ fromUserId, channelName });
      navigate("/call"); // bring receiver to call page
    };

    socket.on("connect", onConnect);
    socket.on("incoming:call", onIncomingCall);

    return () => {
      socket.off("connect", onConnect);
      socket.off("incoming:call", onIncomingCall);
    };
  }, [myUserId]);

  return (
    <SocketContext.Provider value={{ socket, incomingCall, setIncomingCall, myUserId }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);