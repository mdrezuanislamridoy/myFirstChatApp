import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../context/UseGetMessages";
import useConversation from "../../stateManagement/useConversation";
import MessageLoading from "../../components/MessageLoading";
import { useSocket } from "../../context/SocketContext";
import { AuthContext } from "../../context/MessengerContext";

export default function Messages() {
  const { messages = [], loading, error } = useGetMessages();

  const { selectedConversation } = useConversation();
  const { socket } = useSocket();
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  const lastMessage = useRef();
  const { user } = useContext(AuthContext);

  console.log("Messages from hook:", messages, typeof messages);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }, [messages, realtimeMessages]);

  useEffect(() => {
    setRealtimeMessages([]);
  }, [selectedConversation?._id]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (message) => {
        if (
          selectedConversation &&
          ((message.sender === selectedConversation._id &&
            message.receiver === user.id) ||
            (message.receiver === selectedConversation._id &&
              message.sender === user.id))
        ) {
          setRealtimeMessages((prev) => [...prev, message]);
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, selectedConversation, user.id]);

  const combinedMessages = [...(messages || []), ...realtimeMessages];

  const allMessages = combinedMessages.filter(
    (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
  );

  return (
    <div
      className={`flex flex-col gap-2 h-[calc(100vh-130px)] overflow-y-auto ${
        selectedConversation ? "bg-slate-900" : "bg-slate-950"
      } p-2`}
    >
      {!selectedConversation ? (
        <MessageLoading />
      ) : loading ? (
        <MessageLoading />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : allMessages.length > 0 ? (
        allMessages.map((message, index) => (
          <div
            key={message._id || index}
            ref={index === allMessages.length - 1 ? lastMessage : null}
          >
            <Message message={message} />
          </div>
        ))
      ) : (
        <div className="text-center text-white">No messages yet</div>
      )}
    </div>
  );
}
