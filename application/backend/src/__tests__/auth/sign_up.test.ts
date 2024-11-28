import { signUp } from "../../controllers/auth/ctrl_sign_up";
import * as UsersDB from "../../db/users";
import { getMockReq, getMockRes } from "@jest-mock/express";
import HttpCode from "../../constants/http_code";
import bcrypt from "bcryptjs";

jest.mock("../../db/users");
jest.mock("bcryptjs");

describe("POST /api/auth/sign-up", () => {
  const { res, mockClear } = getMockRes();
  beforeEach(() => {
    mockClear();
  });

  it("should return 200 and a success message for valid registration", async () => {
    const req = getMockReq({
      session: {}, // Ensure session is defined
      body: {
        username: "validUser",
        password: "StrongPass1",
        email: "valid@example.com",
      },
    });

    (UsersDB.foundUser as jest.Mock).mockResolvedValue(false);
    (UsersDB.foundEmail as jest.Mock).mockResolvedValue(false);
    (bcrypt.genSalt as jest.Mock).mockResolvedValue("mockSalt");
    (bcrypt.hash as jest.Mock).mockResolvedValue("mockHash");
    (UsersDB.addUser as jest.Mock).mockResolvedValue(true);

    await signUp(req, res);

    expect(UsersDB.foundUser).toHaveBeenCalledWith("validuser"); // username is lowercased
    expect(UsersDB.foundEmail).toHaveBeenCalledWith("valid@example.com"); // email is lowercased
    expect(bcrypt.genSalt).toHaveBeenCalledWith(12);
    expect(bcrypt.hash).toHaveBeenCalledWith("StrongPass1", "mockSalt");
    expect(UsersDB.addUser).toHaveBeenCalledWith("validuser", "mockHash", "valid@example.com");
    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({ message: "Register successful" });
  });

  it("should return 400 if username or email already exists", async () => {
    const req = getMockReq({
      session: {}, // Ensure session is defined
      body: {
        username: "existingUser",
        password: "StrongPass1",
        email: "existing@example.com",
      },
    });

    (UsersDB.foundUser as jest.Mock).mockResolvedValue(true);

    await signUp(req, res);

    expect(UsersDB.foundUser).toHaveBeenCalledWith("existinguser");
    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid username or email" });
  });

  it("should return 400 for invalid input", async () => {
    const req = getMockReq({
      session: {}, // Ensure session is defined
      body: {
        username: "x",
        password: "weak",
        email: "invalid-email",
      },
    });

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid username. It must be 3-20 characters and alphanumeric.",
    });
  });

  it("should return 500 if an internal error occurs", async () => {
    const req = getMockReq({
      session: {}, // Ensure session is defined
      body: {
        username: "validUser",
        password: "StrongPass1",
        email: "valid@example.com",
      },
    });

    (UsersDB.foundUser as jest.Mock).mockResolvedValue(false);
    (UsersDB.foundEmail as jest.Mock).mockResolvedValue(false);
    (bcrypt.genSalt as jest.Mock).mockRejectedValue(new Error("bcrypt error"));

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });

  it("should return 200 if user is already logged in", async () => {
    const req = getMockReq({
      session: { user: { id: 1 } },
      body: {
        username: "newUser",
        password: "StrongPass1",
        email: "new@example.com",
      },
    });

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({ error: "User already logged in" });
  });

  it("should return 400 if any field is missing", async () => {
    const req = getMockReq({
      session: {}, // Ensure session is defined
      body: {
        username: "",
        password: "StrongPass1",
        email: "valid@example.com",
      },
    });

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({
      error: "All fields are required",
    });
  });

  it("should return 400 for invalid email format", async () => {
    const req = getMockReq({
      session: {},
      body: {
        username: "validUser",
        password: "StrongPass1",
        email: "invalid-email",
      },
    });

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email format",
    });
  });

  it("should return 400 for a weak password", async () => {
    const req = getMockReq({
      session: {},
      body: {
        username: "validUser",
        password: "weak",
        email: "valid@example.com",
      },
    });

    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Password must contain at least 8 characters, including an uppercase letter and a number",
    });
  });
});
