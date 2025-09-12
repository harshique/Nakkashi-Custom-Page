import { createRoot } from "react-dom/client";
import App from "./App.tsx";

function initReactApp() {
  const container = document.getElementById("third-screen-section-2");
  const dataEl: any = document.getElementById("collections-data");

  if (container && dataEl) {
    const collectionData = JSON.parse(dataEl.textContent);
    createRoot(container).render(<App collectionsData={collectionData} />);
  }
}

initReactApp();
