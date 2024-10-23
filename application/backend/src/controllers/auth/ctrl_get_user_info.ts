import { Request, Response } from "express";
import HttpCode from "../../constants/http_code";

export async function getUserInfo(req: Request, res: Response) {
  if (req.session?.user) {
    const { username, email } = req.session.user;

    return res.status(HttpCode.OK).json({ username, email });
  }

  return res.status(HttpCode.Unauthorized).json({ message: "User not authenticated" });
}
