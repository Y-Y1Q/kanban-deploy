import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import path from "path";

import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config/swagger";

import * as Session from "./config/session";
import { requestTime } from "./middleware/request_time";
import ApiRoutes from "./routes";

dotenv.config();
// Log the current environment variables
console.log(
  `Current environment variables:\n
  NODE_ENV: \x1b[32m\x1b[1m${process.env.NODE_ENV}\x1b[0m
  OPEN_AI_KEY: \x1b[32m\x1b[1m${process.env.OPEN_AI_KEY}\x1b[0m
  CORS_ORIGIN: \x1b[32m\x1b[1m${process.env.CORS_ORIGIN}\x1b[0m \n`
);

const app = express();
const httpServer = createServer(app);
app.use(requestTime);

// Setup static path and view path
const BACKEND_PATH = path.dirname(import.meta.dirname);
const STATIC_PATH = path.join(BACKEND_PATH, "public");
const VIEW_PATH = path.join(BACKEND_PATH, "src", "views");
console.log(`\nBE path: \x1b[32m\x1b[1m${BACKEND_PATH} \x1b[0m`);
console.log(`BE Static files path: \x1b[32m\x1b[1m${STATIC_PATH}\x1b[0m`);
console.log(`BE EJS template path: \x1b[32m\x1b[1m${VIEW_PATH}\x1b[0m \n`);
app.set("views", VIEW_PATH);
app.set("view engine", "ejs");
app.use(express.static(STATIC_PATH));

// Setup cookie parsing
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setup express session
app.set("trust proxy", true);
app.use(Session.config);
// app.use(Session.logToConsole);
if (process.env.NODE_ENV === "development") {
  app.use(Session.logToConsole);
}

// handle cross origin request
const corsOptions = {
  origin: process.env.CORS_ORIGIN === "true" ? true : process.env.CORS_ORIGIN,
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
console.log(`Cross origin allowed: \x1b[32m\x1b[1m${corsOptions.origin}\x1b[0m`);

//Backend API Routes
app.use(ApiRoutes);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
  console.log(
    `In ${process.env.NODE_ENV ?? "production"} mode, ` +
      `server started on: \x1b[32m\x1b[1m http://localhost:${PORT}/ \x1b[0m`
  );
});
