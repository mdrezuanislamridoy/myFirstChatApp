import { useState } from "react";
import useConversation from "../stateManagement/useConversation";
import AxiosInstance from "../Apis/AxiosInstance";
import { useSocket } from "./SocketContext";

export default function useSendMessage() {
  const { setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { socket } = useSocket();

  const handleSendMessage = async (text) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const res = await AxiosInstance.post(
        `/message/send-message/${selectedConversation._id}`,
        { message: text }
      );

      const savedMessage = res.data.messageData;

      socket.emit("sendMessage", savedMessage);
    } catch (err) {
      console.error(err);
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSendMessage,
    loading,
    error,
  };
}
