import express from "express";

import { Controller } from "../controllers";
import { checkAuth } from "../middleware/check_auth";

import { getChatbotResponse } from "../controllers/ai_interview_prep/generateQuestions";

const router = express.Router();
// test ejs
import { Request, Response } from "express";
import resume_test from "../views/resume_test";
router.get("/ejs", (_req: Request, res: Response) => {
  const resume = resume_test;
  res.render("resume_template", { resume });
});

// Auth routes
router.post("/api/auth/check", Controller.Auth.isAuthenticated);
router.post("/api/auth/sign-up", Controller.Auth.signUp);
router.post("/api/auth/sign-in", Controller.Auth.signIn);
router.post("/api/auth/sign-out", Controller.Auth.signOut);
router.post("/api/auth/user-info", Controller.Auth.getUserInfo);

/* All API routes below are for authenticated user */
//Jobs routes
router.get("/api/jobs", checkAuth, Controller.Jobs.getJobs);
router.get("/api/jobs/company", checkAuth, Controller.Jobs.getJobsByCompany);
router.get("/api/jobs/type", checkAuth, Controller.Jobs.getJobsByType);
router.get("/api/jobs/stats", checkAuth, Controller.Jobs.getJobStats);
router.get("/api/jobs/stats-date", checkAuth, Controller.Jobs.getDateStats);
// router.post("/api/jobs/add", checkAuth, Controller.Jobs.addJob);
// router.get("/api/jobs/:id", checkAuth, Controller.Jobs.getJobDetail);
// router.delete("/api/jobs/:id", checkAuth, Controller.Jobs.deleteJob);
// router.put("/api/jobs/:id", checkAuth, Controller.Jobs.updateJob);

// Column routes

// //AI resume routes
// router.post("/api/ai-resume/generate", checkAuth, Controller.AiResume.generateResume);
// router.get("/api/ai-resume/:id", checkAuth, Controller.AiResume.getResumePrompts);

// Contacts routes
router.post("/api/contacts/add", checkAuth, Controller.Contacts.addContact);
router.get("/api/contacts/search", checkAuth, Controller.Contacts.getContact);
router.delete("/api/contacts/:id", checkAuth, Controller.Contacts.removeContact);

// OpenAI route for AI Interview Prep
router.post("/api/chatbot", getChatbotResponse);

export default router;
