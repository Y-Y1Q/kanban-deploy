import { Request, Response, NextFunction } from "express";
import HttpCode from "../constants/http_code";

// Middleware to check if user is authenticated
export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.user !== undefined && req.session.user.id !== undefined) {
    // CASE: user session exists, set user info to response's local storage(id, username, email)
    res.locals.user = {
      ...req.session.user,
    };

    next();
  } else {
    // CASE: session doesn't exist
    return res.status(HttpCode.Unauthorized).json({ message: "Unauthenticated user" });
  }
}
