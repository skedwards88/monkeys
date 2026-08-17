import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App";
import "./App.css";
import "./ControlBar.css";
import "@skedwards88/shared-components/src/styles/MoreGames.css";
import "@skedwards88/shared-components/src/styles/Install.css";
import {MetadataContextProvider} from "@skedwards88/shared-components/src/components/MetadataContextProvider";

if (process.env.NODE_ENV !== "development" && "serviceWorker" in navigator) {
  const path =
    location.hostname === "localhost"
      ? "/service-worker.js"
      : "/monkeys/service-worker.js";
  const scope = location.hostname === "localhost" ? "" : "/monkeys/";
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(path, {scope: scope})
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <MetadataContextProvider>
      <App />
    </MetadataContextProvider>
  </React.StrictMode>,
);
