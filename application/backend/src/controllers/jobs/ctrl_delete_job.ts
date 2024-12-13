import { Request, Response } from "express";

import { deleteJobById } from "../../db/jobs/delete_job";
import HttpCode from "../../constants/http_code";

export async function deleteJob(req: Request, res: Response) {
  const jobId = Number(req.params.id);

  if (isNaN(jobId)) {
    return res.status(HttpCode.BadRequest).json({ error: "Invalid job ID. Must be a number." });
  }

  try {
    await deleteJobById(jobId);
    return res.status(HttpCode.OK).json({ message: "Job record deleted." });
  } catch (err) {
    console.error("Error deleting job record:", err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + (err as Error).message });
  }
}
