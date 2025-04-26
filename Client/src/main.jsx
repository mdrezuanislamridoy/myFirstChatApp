import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MessengerContext from "./context/MessengerContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MessengerContext>
      <SocketProvider>
        <App />
      </SocketProvider>
    </MessengerContext>
  </StrictMode>
);
