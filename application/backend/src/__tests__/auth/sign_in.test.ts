import { signIn } from "../../controllers/auth/ctrl_sign_in";
import * as UsersDB from "../../db/users";
import bcrypt from "bcryptjs";
import { getMockReq, getMockRes } from "@jest-mock/express";
import HttpCode from "../../constants/http_code";

jest.mock("../../db/users");
jest.mock("bcryptjs");

describe("POST /api/auth/sign-in", () => {
  const { res, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  it("should return 400 if required fields are missing", async () => {
    const req = getMockReq({
      body: { username: "", password: "" },
    });

    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it("should return 200 if the user is already logged in", async () => {
    const req = getMockReq({
      body: { username: "testuser", password: "password123" },
      session: { user: { id: 1, username: "testuser" } },
    });

    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({ message: "User already logged in" });
  });

  it("should return 400 if the user does not exist", async () => {
    const req = getMockReq({
      body: { username: "nonexistent", password: "password123" },
    });

    (UsersDB.foundUser as jest.Mock).mockResolvedValue(false);

    await signIn(req, res);

    expect(UsersDB.foundUser).toHaveBeenCalledWith("nonexistent");
    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  it("should return 400 if the password is incorrect", async () => {
    const req = getMockReq({
      body: { username: "testuser", password: "wrongpassword" },
    });

    (UsersDB.foundUser as jest.Mock).mockResolvedValue(true);
    (UsersDB.getUser as jest.Mock).mockResolvedValue({
      id: 1,
      username: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await signIn(req, res);

    expect(UsersDB.foundUser).toHaveBeenCalledWith("testuser");
    expect(UsersDB.getUser).toHaveBeenCalledWith("testuser");
    expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedpassword");
    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  it("should return 200 and log the user in if credentials are correct", async () => {
    const req = getMockReq({
      body: { username: "testuser", password: "correctpassword" },
      session: {},
    });

    (UsersDB.foundUser as jest.Mock).mockResolvedValue(true);
    (UsersDB.getUser as jest.Mock).mockResolvedValue({
      id: 1,
      username: "testuser",
      email: "testuser@example.com",
      password: "hashedpassword",
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await signIn(req, res);

    expect(UsersDB.foundUser).toHaveBeenCalledWith("testuser");
    expect(UsersDB.getUser).toHaveBeenCalledWith("testuser");
    expect(bcrypt.compare).toHaveBeenCalledWith("correctpassword", "hashedpassword");
    expect(req.session.user).toEqual({
      id: 1,
      username: "testuser",
      email: "testuser@example.com",
    });
    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({ message: "Login successful" });
  });

  it("should return 500 if an error occurs", async () => {
    const req = getMockReq({
      body: { username: "testuser", password: "password123" },
    });

    const mockError = new Error("Database error");
    (UsersDB.foundUser as jest.Mock).mockRejectedValue(mockError);

    await signIn(req, res);

    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});
