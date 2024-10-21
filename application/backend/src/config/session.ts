import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import expressSession from "express-session";

import { db } from "../db/db_connection";

dotenv.config();

// Extend the SessionData to include 'user' type
declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      username: string;
      email: string;
    };
  }
}

// Create a session store using connect-pg-simple with PostgreSQL
const sessionStore = pgSession(expressSession);

// Configuration for express-session middleware
export const config = expressSession({
  store: new sessionStore({
    pgPromise: db,
  }),
  secret: process.env.SECRET || "dev-mode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain: ".onrender.com",
    httpOnly: false,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production", // Set to true if in production for HTTPS
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  },
});

// Middleware to log session data to the console
export function logToConsole(req: Request, _res: Response, next: NextFunction) {
  if (req.session.user !== undefined) {
    console.log("Session data: " + JSON.stringify(req.session));
  }
  next();
}
