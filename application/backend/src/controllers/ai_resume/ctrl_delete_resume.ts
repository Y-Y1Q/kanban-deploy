import { Request, Response } from "express";

import { deleteUserResumeRecord } from "../../db/ai_resume/delete_resume";
import { foundUserResume } from "../../db/ai_resume/get_resume";
import HttpCode from "../../constants/http_code";

export async function deleteUserResume(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const resumeExists = await foundUserResume(userId);

  if (!resumeExists) {
    return res.status(HttpCode.BadRequest).json({ error: "Resume record doesn't exist" });
  }

  try {
    await deleteUserResumeRecord(userId);
    return res.status(HttpCode.OK).json({ message: "Resume record deleted." });
  } catch (err) {
    console.error("Error deleting resume record:", err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + (err as Error).message });
  }
}
