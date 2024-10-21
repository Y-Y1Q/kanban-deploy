import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import * as UsersDB from "../../db/users";
import HttpCode from "../../constants/http_code";

export async function login(req: Request, res: Response) {
  const { username, password } = {
    username: req.body.username?.trim(),
    password: req.body.password?.trim(),
  };

  // Check if all required fields are present
  if (!username || !password) {
    return res.status(HttpCode.BadRequest).json({ error: "All fields are required" });
  }

  // Case: user is already logged in, FE should redirect to kanban page
  if (req.session.user !== undefined) {
    return res.status(HttpCode.OK).json({ message: "User already logged in" });
  }

  try {
    const userExists = await UsersDB.foundUser(username);

    if (!userExists) {
      return res.status(HttpCode.BadRequest).json({ error: "User does not exist" });
    }

    const user = await UsersDB.getUser(username);
    const isPasswordSame = await bcrypt.compare(password, user!.password);

    if (isPasswordSame) {
      req.session.user = {
        id: user!.id,
        username: user!.username,
        email: user!.email,
      };

      return res.status(HttpCode.OK).json({ message: "Login successful" });
    } else {
      return res.status(HttpCode.BadRequest).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Internal server error" });
  }
}
