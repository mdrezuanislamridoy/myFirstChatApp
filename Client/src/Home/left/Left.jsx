import React from "react";
import SearchBar from "./SearchBar";
import Users from "./Users";
import Logout from "./Logout";

export default function Left({ className }) {
  return (
    <div className={`${className} p-2 bg-slate-800`}>
      <h1 className="text-3xl font-bold py-2">Chat</h1>
      <SearchBar />
      <hr />
      <Users></Users>
      <Logout></Logout>{" "}
    </div>
  );
}
