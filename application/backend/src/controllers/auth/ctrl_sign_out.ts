import { Request, Response } from "express";

import HttpCode from "../../constants/http_code";

export function signOut(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(HttpCode.InternalServerError).json({ error: "Logout failed: " + err });
    }

    return res.status(HttpCode.OK).json({ message: "You have successfully logged out." });
  });
}
