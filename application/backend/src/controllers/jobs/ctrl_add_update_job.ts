import { Request, Response } from "express";

import * as JobDB from "../../db/jobs/add_update_job";
import HttpCode from "../../constants/http_code";

export async function addJob(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const columnId = req.body.column_id!;
  const jobData = req.body.jobData!;

  try {
    const success = await JobDB.addJob(userId, columnId, jobData);

    if (success) {
      return res.status(HttpCode.Created).json({ message: "Job entry added successfully." });
    } else {
      return res.status(HttpCode.BadRequest).json({ error: "Failed to add job entry." });
    }
  } catch (error) {
    console.error("Error adding job entry:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Failed to add job entry." });
  }
}

/* istanbul ignore next */
export async function updateJob(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const jobId = Number(req.params.id);
  const jobData = req.body.jobData!;

  try {
    const success = await JobDB.updateJob(userId, jobId, jobData);

    if (success) {
      return res.status(HttpCode.OK).json({ message: "Job entry updated successfully." });
    } else {
      return res.status(HttpCode.BadRequest).json({ error: "Failed to update job entry." });
    }
  } catch (error) {
    console.error("Error adding job entry:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Failed to update job entry." });
  }
}
