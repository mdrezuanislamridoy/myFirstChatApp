import React, { useEffect } from "react";
import { useSocket } from "./SocketContext";
import useConversation from "../stateManagement/useConversation";

export default function useGetSocketMessage() {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [setMessages, socket]);

  return { messages, setMessages };
}
