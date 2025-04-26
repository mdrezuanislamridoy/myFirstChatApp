import React from "react";
import myPhoto from "../../assets/My.png";
import useConversation from "../../stateManagement/useConversation";
import { useSocket } from "../../context/SocketContext";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocket();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`${
        isSelected ? "bg-slate-700" : ""
      } hover:bg-slate-500 duration-300`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer w-full">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-14 rounded-full">
            <img src={myPhoto} />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold">{user.name}</h1>
          <p className="text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
