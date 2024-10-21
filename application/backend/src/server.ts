import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import path from "path";

import * as Session from "./config/session";
import { requestTime } from "./middleware/request_time";
import Routes from "./routes";

const app = express();
const httpServer = createServer(app);
app.use(requestTime);

// Static path to serve files
const BACKEND_PATH = path.dirname(path.dirname(import.meta.dirname));
const STATIC_PATH = path.join(BACKEND_PATH, "public");
app.use(express.static(STATIC_PATH));

// Setup cookie parsing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup express session
app.set("trust proxy", true);
app.use(Session.config);
if (process.env.NODE_ENV === "development") {
  app.use(Session.logToConsole);
}

// handle cross origin request
dotenv.config();
const corsOptions = {
  origin: "https://ezjobs.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//Backend API Routes
app.use(Routes);

const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
  console.log(
    `In ${process.env.NODE_ENV ?? "production"} mode, ` +
      `server started on: \x1b[32m\x1b[1m http://localhost:${PORT}/ \x1b[0m`
  );
});
