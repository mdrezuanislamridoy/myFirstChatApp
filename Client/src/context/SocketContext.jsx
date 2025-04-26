import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./MessengerContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketInstance = io("https://my-first-chat-app-lemon.vercel.app/", {
      query: {
        userId: user.id,
      },
    });

    setSocket(socketInstance);

    socketInstance.on("getOnlineUsers", (users) => {
      console.log("Online Users:", users);
      setOnlineUsers(users);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]); // Only runs when user changes

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
