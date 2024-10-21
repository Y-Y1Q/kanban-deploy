import React from "react";
import ReactDOM from "react-dom/client";
import * as dotenv from "dotenv"
import axios from "axios";

import App from "./App.js";

dotenv.config();
axios.defaults.baseURL= process.env.BASE_URL;
axios.defaults.withCredentials = true;


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
