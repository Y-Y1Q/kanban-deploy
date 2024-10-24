import { Request, Response } from "express";

import * as JobsDB from "../../db/jobs";
import HttpCode from "../../constants/http_code";

export async function getJobs(req: Request, res: Response) {
  const { id: userId } = req.session.user!;

  try {
    const jobs = await JobsDB.getJobs(userId);
    return res.status(HttpCode.OK).json({ jobs });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}

export async function getJobsByCompany(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const { company } = req.query;

  if (typeof company !== "string") {
    return res.status(HttpCode.BadRequest).json({ error: "Invalid company name" });
  }

  try {
    const jobs = await JobsDB.getJobsByCompany(userId, company);
    return res.status(HttpCode.OK).json({ jobs });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}

export async function getJobsByType(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const { type } = req.query;

  if (typeof type !== "string") {
    return res.status(HttpCode.BadRequest).json({ error: "Invalid type name" });
  }

  try {
    const jobs = await JobsDB.getJobsByType(userId, type);
    return res.status(HttpCode.OK).json({ jobs });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}
