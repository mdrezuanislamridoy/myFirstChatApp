import React, { useEffect, useState } from "react";
import useConversation from "../stateManagement/useConversation";
import AxiosInstance from "../Apis/AxiosInstance";

export default function useGetMessages() {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      try {
        const res = await AxiosInstance.get(
          `/message/messages/${selectedConversation._id}`
        );

        setMessages(res.data.messages);

        console.log(res.data.messages);

        if (res.data.messages.length === 0) {
          setError("No messages found");
        } else {
          setError("");
        }

        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages]);

  return {
    messages: Array.isArray(messages) ? messages : [],
    loading,
    error,
  };
}
