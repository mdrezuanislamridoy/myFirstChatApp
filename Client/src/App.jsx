import React, { useContext } from "react";
import Home from "./Home/Home";
import { AuthContext } from "./context/MessengerContext";
import Login from "./Authentication/login/Login";
import SignUp from "./Authentication/signup/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Loading from "./components/Loading";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        {!user ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}
