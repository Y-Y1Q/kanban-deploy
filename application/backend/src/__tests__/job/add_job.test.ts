import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { addJob } from "../../controllers/jobs/ctrl_add_update_job";
import * as JobDB from "../../db/jobs/add_update_job";
import HttpCode from "../../constants/http_code";

jest.mock("../../db/jobs/add_update_job");

describe("POST /api/jobs/add", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  /*
    body: {
        column_id: 2,
        jobData: { title: "Testing" },
      },
  
  */

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn(() => ({ json: mockJson }));

    res = {
      status: mockStatus,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a job entry and return a success response", async () => {
    (JobDB.addJob as jest.Mock).mockResolvedValue(true);

    await addJob(req as Request, res as Response);

    expect(JobDB.addJob).toHaveBeenCalledWith(1, 2, { title: "Software Engineer" });
    expect(mockStatus).toHaveBeenCalledWith(HttpCode.Created);
    expect(mockJson).toHaveBeenCalledWith({ message: "Job entry added successfully." });
  });

  it("should return a bad request response when job addition fails", async () => {
    (JobDB.addJob as jest.Mock).mockResolvedValue(false);

    await addJob(req as Request, res as Response);

    expect(JobDB.addJob).toHaveBeenCalledWith(1, 2, { title: "Software Engineer" });
    expect(mockStatus).toHaveBeenCalledWith(HttpCode.BadRequest);
    expect(mockJson).toHaveBeenCalledWith({ error: "Failed to add job entry." });
  });

  it("should return an internal server error response on exception", async () => {
    (JobDB.addJob as jest.Mock).mockRejectedValue(new Error("Database error"));

    await addJob(req as Request, res as Response);

    expect(JobDB.addJob).toHaveBeenCalledWith(1, 2, { title: "Software Engineer" });
    expect(mockStatus).toHaveBeenCalledWith(HttpCode.InternalServerError);
    expect(mockJson).toHaveBeenCalledWith({ error: "Failed to add job entry." });
  });
});
