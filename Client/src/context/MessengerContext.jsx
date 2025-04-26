import { createContext, useEffect, useState } from "react";
import AxiosInstance from "../Apis/AxiosInstance";
import Cookies from "js-cookie";

const AuthContext = createContext();

export default function MessengerContext({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await AxiosInstance.get("/auth/mydata");
        setUser(res.data.user);
        console.log(res.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, setUsers, users }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
