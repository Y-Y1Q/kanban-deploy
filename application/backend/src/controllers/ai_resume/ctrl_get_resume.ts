import { Request, Response } from "express";

import * as ResumeDB from "../../db/ai_resume/get_resume";
import HttpCode from "../../constants/http_code";

export async function getUserResumeInput(req: Request, res: Response) {
  const { id: userId } = req.session.user!;

  const userInputExists = await ResumeDB.foundUserResume(userId);

  if (!userInputExists) {
    return res.status(HttpCode.OK).json({ hasInput: false });
  }

  try {
    const resumeData = await ResumeDB.getUserResumeInput(userId);
    return res.status(HttpCode.OK).json({ hasInput: true, resumeData });
  } catch (err) {
    console.error("Error fetching resume record:", err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + (err as Error).message });
  }
}

/* istanbul ignore next */
export async function getResumePage(req: Request, res: Response) {
  const { token: resumeToken } = req.params;

  const aiResumeExists = await ResumeDB.foundUserToken(resumeToken);

  if (!aiResumeExists) {
    return res.status(HttpCode.BadRequest).json({ error: "AI resume doesn't exist" });
  }

  const resume = await ResumeDB.getAiResumeInput(resumeToken);
  return res.render("resume_template", { resume });
}

/*  

default test resume page after DB reset

http://localhost:3333/ai-resume/abc123xyz456

*/
