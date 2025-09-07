import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("third-screen-section-2")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
