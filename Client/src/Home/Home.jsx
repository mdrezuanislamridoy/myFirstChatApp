import React from "react";
import Left from "./left/Left";
import Right from "./right/Right";

export default function Home() {
  return (
    <div className="flex bg-slate-950 h-screen text-white">
      <Left className="w-1/3" />
      <Right className="w-2/3" />
    </div>
  );
}
