import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import validator from "validator";

import * as UsersDB from "../../db/users";
import HttpCode from "../http_code";

const SALT_ROUNDS = 12;

// Validate request body and perform register logic
export async function register(req: Request, res: Response) {
  const { username, password, email } = {
    username: req.body.username?.trim(),
    password: req.body.password?.trim(),
    email: req.body.email?.trim(),
  };

  const validation = validateRegistration(req);
  if (!validation.valid) {
    return res.status(validation.statusCode!).json({ error: validation.message });
  }

  try {
    const userExists = await UsersDB.foundUser(username);

    if (userExists) {
      return res.status(HttpCode.BadRequest).json({ error: `Invalid credentials` });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    await UsersDB.addUser(username, hash, email);

    return res.status(HttpCode.OK).json({ message: "Register successful" });
  } catch (error) {
    console.log(error);
    return res.status(HttpCode.InternalServerError).json({ error: "Internal server error" });
  }
}

function validateRegistration(req: Request) {
  const { username, password, email } = {
    username: req.body.username?.trim(),
    password: req.body.password?.trim(),
    email: req.body.email?.trim(),
  };

  if (!username || !password || !email) {
    return { valid: false, message: "All fields are required", statusCode: HttpCode.BadRequest };
  }

  if (req.session.user !== undefined) {
    return { valid: false, message: "User already logged in", statusCode: HttpCode.OK };
  }

  if (checkName(username)) {
    return { valid: false, message: "Invalid username to use", statusCode: HttpCode.BadRequest };
  }

  if (!validator.isEmail(email)) {
    return { valid: false, message: "Invalid email format", statusCode: HttpCode.BadRequest };
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    return {
      valid: false,
      message:
        "Password must contain at least 8 characters, including an uppercase letter and a number",
      statusCode: HttpCode.BadRequest,
    };
  }

  return { valid: true };
}

function checkName(str: string): boolean {
  return str.toUpperCase() === "ADMIN";
}
