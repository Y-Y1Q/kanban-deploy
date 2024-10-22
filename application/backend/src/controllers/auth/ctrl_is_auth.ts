import { Request, Response } from "express";
import HttpCode from "../../constants/http_code";

export function isAuthenticated(req: Request, res: Response) {
  // Log session details for debugging
  // console.log("Session:", req.session);

  if (req.session?.user && req.session.user.id) {
    // CASE: user session exists
    return res.status(HttpCode.OK).json({ authenticated: true });
  }

  // CASE: session doesn't exist
  return res.status(HttpCode.Unauthorized).json({ authenticated: false });
}
