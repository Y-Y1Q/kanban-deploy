import { Request, Response } from "express";

import * as ResumeDB from "../../db/ai_resume/add_update_resume";
import { foundUserResume } from "../../db/ai_resume/get_resume";
import HttpCode from "../../constants/http_code";

export async function saveUserResumeInput(req: Request, res: Response) {
  try {
    const { id: userId } = req.session.user!;
    const resumeData = req.body.resumeData!;
    const resumeExists = await foundUserResume(userId);

    if (resumeExists) {
      await ResumeDB.updateUserResumeInput(userId, resumeData);
    } else {
      await ResumeDB.addUserResumeInput(userId, resumeData);
    }

    return res.status(HttpCode.OK).json({ message: "Resume data saved." });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Failed to save resume data." });
  }
}

export async function updateAiResumeInput(req: Request, res: Response) {
  //todo
}
