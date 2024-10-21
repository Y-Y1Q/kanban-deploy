import { Request, Response } from "express";
import HttpCode from "../../constants/http_code";

export function isAuthenticated(req: Request, res: Response) {
  if (req.session.user !== undefined && req.session.user.id !== undefined) {
    // CASE: user session exists
    return res.status(HttpCode.OK).json({ authenticated: true });
  }

  // CASE: session doesn't exist
  return res.status(HttpCode.Unauthorized).json({ authenticated: false });
}
