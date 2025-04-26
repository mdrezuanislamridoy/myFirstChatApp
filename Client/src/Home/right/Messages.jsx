import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGetMessages from "../../context/UseGetMessages";
import useConversation from "../../stateManagement/useConversation";
import MessageLoading from "../../components/MessageLoading";
import { useSocket } from "../../context/SocketContext"; // ✅ import socket

export default function Messages() {
  const { messages = [], loading, error } = useGetMessages();

  const { selectedConversation } = useConversation();
  const { socket } = useSocket();
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  const lastMessage = useRef();

  console.log("Messages from hook:", messages, typeof messages);

  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  }, [messages, realtimeMessages]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        console.log("📩 Received new message:", message);
        if (
          selectedConversation &&
          [message.sender?.toString(), message.receiver?.toString()].includes(
            selectedConversation._id?.toString()
          )
        ) {
          setRealtimeMessages((prev) => [...prev, message]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, selectedConversation]);

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
