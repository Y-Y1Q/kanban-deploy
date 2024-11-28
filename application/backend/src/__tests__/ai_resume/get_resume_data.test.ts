import { getUserResumeInput } from "../../controllers/ai_resume/ctrl_get_resume";
import * as ResumeDB from "../../db/ai_resume/get_resume";
import { getMockReq, getMockRes } from "@jest-mock/express";
import HttpCode from "../../constants/http_code";

jest.mock("../../db/ai_resume/get_resume");

describe("GET /api/ai-resume", () => {
  const req = getMockReq({
    session: {
      user: { id: 1 }, // Mock user with id 1 in session
    },
  });

  const { res, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  it("should return status code 200 with hasInput false if user input does not exist", async () => {
    (ResumeDB.foundUserResume as jest.Mock).mockResolvedValue(false);

    await getUserResumeInput(req, res);

    expect(ResumeDB.foundUserResume).toHaveBeenCalledWith(1); // userId is 1
    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({ hasInput: false });
  });

  it("should return status code 200 with hasInput true and resumeData if user input exists", async () => {
    const mockResumeData = { skills: ["JavaScript", "TypeScript"] };

    (ResumeDB.foundUserResume as jest.Mock).mockResolvedValue(true);
    (ResumeDB.getUserResumeInput as jest.Mock).mockResolvedValue(mockResumeData);

    await getUserResumeInput(req, res);

    expect(ResumeDB.foundUserResume).toHaveBeenCalledWith(1); // userId is 1
    expect(ResumeDB.getUserResumeInput).toHaveBeenCalledWith(1); // userId is 1
    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({
      hasInput: true,
      resumeData: mockResumeData,
    });
  });

  it("should return status code 500 if an error occurs during database access", async () => {
    const mockError = new Error("Database error");

    (ResumeDB.foundUserResume as jest.Mock).mockResolvedValue(true);
    (ResumeDB.getUserResumeInput as jest.Mock).mockRejectedValue(mockError);

    await getUserResumeInput(req, res);

    expect(ResumeDB.foundUserResume).toHaveBeenCalledWith(1); // userId is 1
    expect(ResumeDB.getUserResumeInput).toHaveBeenCalledWith(1); // userId is 1
    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error: " + mockError.message,
    });
  });
});
