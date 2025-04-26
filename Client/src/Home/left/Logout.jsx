import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AxiosInstance from "../../Apis/AxiosInstance";

export default function Logout() {
  const handleLogout = () => {
    const logout = async () => {
      try {
        const res = await AxiosInstance.get("/auth/logout");
        console.log(res.data.message);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    };
    logout();
  };
  return (
    <div className="py-2 absolute bottom-0 left-2 right-0 ">
      <button
        className="text-slate-400 hover:text-white cursor-pointer "
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        &nbsp;Logout
      </button>
    </div>
  );
}
