import React, { useContext } from "react";
import { AuthContext } from "../../context/MessengerContext";

export default function Message({ message }) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {message.sender === user.id ? (
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-accent">
            {message.message}
          </div>
        </div>
      ) : (
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-primary">
            {message.message}
          </div>
        </div>
      )}
    </>
  );
}
