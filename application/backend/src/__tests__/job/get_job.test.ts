import { getJobs } from "../../controllers/jobs/ctrl_get_job";
import * as JobsDB from "../../db/jobs/get_jobs";
import { getMockReq, getMockRes } from "@jest-mock/express";
import HttpCode from "../../constants/http_code";

jest.mock("../../db/jobs/get_jobs");

describe("GET /api/jobs", () => {
  const req = getMockReq({
    session: {
      user: { id: 1 }, // Mock user with id 1 in session
    },
  });

  const { res, mockClear } = getMockRes();
  beforeEach(() => {
    mockClear();
  });

  it("should return status code 200 if fetching job is successful", async () => {
    const mockJobs = [{ id: 1 }];
    (JobsDB.getJobs as jest.Mock).mockResolvedValue(mockJobs);

    await getJobs(req, res);

    expect(JobsDB.getJobs).toHaveBeenCalledWith(1); // userId is 1
    expect(res.status).toHaveBeenCalledWith(HttpCode.OK);
    expect(res.json).toHaveBeenCalledWith({ jobs: mockJobs });
  });

  it("should return status code 500 if failed to fetch job", async () => {
    const mockError = new Error("Database error");
    (JobsDB.getJobs as jest.Mock).mockRejectedValue(mockError);

    await getJobs(req, res);

    expect(JobsDB.getJobs).toHaveBeenCalledWith(1); // userId is 1
    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error: " + mockError,
    });
  });
});
