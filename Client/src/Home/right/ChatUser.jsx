import React from "react";
import myPhoto from "../../assets/My.png";
import useConversation from "../../stateManagement/useConversation";
import { useSocket } from "../../context/SocketContext";

export default function ChatUser() {
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(selectedConversation?._id);

  return (
    <div>
      {selectedConversation ? (
        <div>
          <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg cursor-pointer w-full">
            <div
              className={`avatar ${
                isOnline ? "avatar-online" : "avatar-offline"
              }`}
            >
              <div className="w-14 rounded-full">
                <img src={myPhoto} />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">{selectedConversation.name}</h1>
              <p className="text-sm">{isOnline ? "Online" : "Offline"}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
