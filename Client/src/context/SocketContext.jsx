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
    let socketInstance;

    if (user) {
      socketInstance = io("http://localhost:5000", {
        query: {
          userId: user.id,
        },
      });
      setSocket(socketInstance);

      socketInstance?.on("getOnlineUsers", (users) => {
        console.log("Online Users:", users);
        setOnlineUsers(users);
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
