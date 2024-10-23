import { Request, Response } from "express";
import HttpCode from "../../constants/http_code";

export async function getUserInfo(req: Request, res: Response) {
  if (req.session?.user) {
    const { username, email } = req.session.user;

    return res.status(HttpCode.OK).json({ username, email, authenticated: true });
  }

  return res.status(HttpCode.OK).json({ authenticated: false });
}
