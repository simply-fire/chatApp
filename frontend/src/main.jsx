import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SocketContextProvider } from "./contexts/SocketContext";
import App from "./App";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <SocketContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </SocketContextProvider>
);
