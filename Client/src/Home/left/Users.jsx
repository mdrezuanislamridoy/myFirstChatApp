import React, { useContext, useEffect, useState } from "react";
import User from "./User";
import AxiosInstance from "../../Apis/AxiosInstance";
import { AuthContext } from "../../context/MessengerContext";

export default function Users() {
  const { setUsers } = useContext(AuthContext);
  const [users, setLocalUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AxiosInstance.get("/auth/users");
        setLocalUsers(res.data.users);
        setUsers(res.data.users);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Error fetching users:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [setUsers]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-4">Loading users...</div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-140px)] overflow-y-auto">
      {users.length === 0 ? (
        <p className="text-center text-gray-400">No users found.</p>
      ) : (
        users.map((user) => <User key={user._id} user={user} />)
      )}
    </div>
  );
}
