import axios from "axios";
// import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./main.css";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
