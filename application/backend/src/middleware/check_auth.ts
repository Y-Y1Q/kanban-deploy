import { Request, Response, NextFunction } from "express";
import HttpCode from "../constants/http_code";

// Middleware to check if user is authenticated
export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user && req.session.user.id) {
    // CASE: user session exists, set user info to response's local storage(id, username, email)
    res.locals.user = { ...req.session.user };

    return next();
  } else {
    // CASE: session doesn't exist or user is not authenticated
    return res.status(HttpCode.Unauthorized).json({ message: "Unauthenticated user" });
  }
}
