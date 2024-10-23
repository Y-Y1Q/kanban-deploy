import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import validator from "validator";

import * as UsersDB from "../../db/users";
import HttpCode from "../../constants/http_code";

const SALT_ROUNDS = 12;

// Validate request body and perform register logic
export async function signUp(req: Request, res: Response) {
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
    let usernameStr: string = username!;
    let emailStr: string = email!;
    usernameStr = usernameStr.toLowerCase();
    emailStr = emailStr.toLowerCase();

    const userExists = await UsersDB.foundUser(usernameStr);
    const emailExists = await UsersDB.foundEmail(emailStr);

    if (userExists || emailExists) {
      return res.status(HttpCode.BadRequest).json({ error: "Invalid username or email" });
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    await UsersDB.addUser(usernameStr, hash, emailStr);

    return res.status(HttpCode.OK).json({ message: "Register successful" });
  } catch (error) {
    console.log(error);
    return res.status(HttpCode.InternalServerError).json({ error: "Internal server error" });
  }
}

// Helper function to validate request body
function validateRegistration(req: Request) {
  if (req.session.user !== undefined) {
    return { valid: false, message: "User already logged in", statusCode: HttpCode.OK };
  }

  const { username, password, email } = {
    username: req.body.username?.trim(),
    password: req.body.password?.trim(),
    email: req.body.email?.trim(),
  };

  if (!username || !password || !email) {
    return { valid: false, message: "All fields are required", statusCode: HttpCode.BadRequest };
  }

  if (!validator.isAlphanumeric(username) || !validator.isLength(username, { min: 3, max: 20 })) {
    return {
      valid: false,
      message: "Invalid username. It must be 3-20 characters and alphanumeric.",
      statusCode: HttpCode.BadRequest,
    };
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
