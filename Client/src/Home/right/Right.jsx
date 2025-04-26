import React from "react";
import ChatUser from "./ChatUser";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

export default function Right({ className }) {
  return (
    <div className={`${className} flex flex-col p-2`}>
      <ChatUser></ChatUser>
      <Messages></Messages>
      <SendMessage />
    </div>
  );
}
