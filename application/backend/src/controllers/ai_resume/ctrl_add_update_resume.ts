import { Request, Response } from "express";
import { customAlphabet } from "nanoid";
import * as ResumeDB from "../../db/ai_resume/add_update_resume";
import * as OpenAiResume from "./open_ai_api";
import { getUserResumeInput } from "../../db/ai_resume/get_resume";
import { foundUserResume } from "../../db/ai_resume/get_resume";
import HttpCode from "../../constants/http_code";
import { AiResume } from "../../db/db_types";
import dotenv from "dotenv";

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
  dotenv.config();

  if (process.env.OPEN_AI_KEY === undefined) {
    return res.status(HttpCode.BadRequest).json({ error: "No OpenAI API Key available" });
  }

  try {
    const { id: userId } = req.session.user!;
    const resumeExists = await foundUserResume(userId);

    if (!resumeExists) {
      return res.status(HttpCode.BadRequest).json({ error: "No resume data found." });
    }

    // Generate safe unique token to for user resume page
    const nanoid = customAlphabet(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      10
    );
    const resumeToken = `${nanoid()}-${userId}`;

    // Summarize user input via OpenAI api and save to DB
    const resumeUserInput = await getUserResumeInput(userId);
    const aiSkills = await OpenAiResume.summarizeSkills(resumeUserInput!.relevant_skills!);
    const aiEdu = await OpenAiResume.summarizeEducation(resumeUserInput!.education!);
    const aiExp = await OpenAiResume.summarizeExperience(resumeUserInput!.experience!);
    const aiProj = await OpenAiResume.summarizeProjects(resumeUserInput!.projects!);

    const resumeData: Partial<AiResume> = {
      ai_skills: aiSkills,
      ai_edu: aiEdu,
      ai_exp: aiExp,
      ai_proj: aiProj,
    };

    await ResumeDB.updateAiResumeInput(userId, resumeToken, resumeData);
    return res
      .status(HttpCode.OK)
      .json({ message: "AI resume generated", token: `${resumeToken}` });
  } catch (error) {
    console.error("Error saving resume data:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Failed to save resume data." });
  }
}
