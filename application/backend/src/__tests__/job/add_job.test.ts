import { addJob } from "../../controllers/jobs/ctrl_add_update_job";
import * as JobDB from "../../db/jobs/add_update_job";
import { getMockReq, getMockRes } from "@jest-mock/express";
import HttpCode from "../../constants/http_code";

jest.mock("../../db/jobs/add_update_job");

describe("POST /api/jobs/add", () => {
  const mockUserId = 1;
  const mockColumnId = 4; // column id for Offer status
  const mockJobData = {
    company: "Test company",
    position: "Test position",
    current_status: "Offer",
  };

  const req = getMockReq({
    session: {
      user: { id: mockUserId },
    },
    body: {
      column_id: mockColumnId,
      jobData: mockJobData,
    },
  });

  const { res, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  it("should return status code 201 if adding job is successful", async () => {
    (JobDB.addJob as jest.Mock).mockResolvedValue(true);

    await addJob(req, res);

    expect(JobDB.addJob).toHaveBeenCalledWith(mockUserId, mockColumnId, mockJobData);
    expect(res.status).toHaveBeenCalledWith(HttpCode.Created);
    expect(res.json).toHaveBeenCalledWith({ message: "Job entry added successfully." });
  });

  it("should return status code 400 if failed to add job", async () => {
    (JobDB.addJob as jest.Mock).mockResolvedValue(false);

    await addJob(req, res);

    expect(JobDB.addJob).toHaveBeenCalledWith(mockUserId, mockColumnId, mockJobData);
    expect(res.status).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to add job entry." });
  });

  it("should return status code 500 if there is internal error", async () => {
    const mockError = new Error("Database error");
    (JobDB.addJob as jest.Mock).mockRejectedValue(mockError);

    await addJob(req, res);

    expect(JobDB.addJob).toHaveBeenCalledWith(mockUserId, mockColumnId, mockJobData);
    expect(res.status).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to add job entry." });
  });
});
