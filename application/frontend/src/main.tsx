import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";

axios.defaults.baseURL = import.meta.env.BASE_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
