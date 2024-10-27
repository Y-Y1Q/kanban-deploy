import axios from "axios";
// import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./main.css";

axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
