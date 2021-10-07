import React from "react";
import ReactDOM from "react-dom";
import Game from "./App.js";

if (module.hot) module.hot.accept();

if ("serviceWorker" in navigator) {
  console.log("HOSTNAME");
  console.log(location.hostname);
  const path =
    location.hostname === "localhost"
      ? "/service-worker.js"
      : "/monkeys/service-worker.js";
  const scope = location.hostname === "localhost" ? "" : "/monkeys/";
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(path, { scope: scope })
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

ReactDOM.render(<Game />, document.getElementById("root"));
