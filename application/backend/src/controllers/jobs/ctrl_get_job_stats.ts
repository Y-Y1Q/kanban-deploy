import { Request, Response } from "express";

import * as JobsDB from "../../db/jobs/get_job_stats";
import HttpCode from "../../constants/http_code";

export async function getJobStats(req: Request, res: Response) {
  const { id: userId } = req.session.user!;

  try {
    const job_stats = await JobsDB.getJobStats(userId);
    return res.status(HttpCode.OK).json({ job_stats });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}

export async function getDateStats(req: Request, res: Response) {
  const { id: userId } = req.session.user!;

  try {
    const date_stats = await JobsDB.getDateStats(userId);
    return res.status(HttpCode.OK).json({ date_stats });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}
