import express from "express";
import { Request, Response } from "express";

import { Controller } from "../controllers";
import { checkAuth } from "../middleware/check_auth";

const router = express.Router();

// Test
router.get("/", (_req: Request, res: Response) => {
  res.send("CSC 648 EzJobs Backend Server");
});

// Auth routes
router.get("/api/auth", Controller.Auth.isAuthenticated);
router.post("/api/auth/register", Controller.Auth.register);
router.post("/api/auth/login", Controller.Auth.login);
router.post("/api/auth/logout", Controller.Auth.logout);

/* All API routes below are for authenticated user */
//Jobs routes
router.post("/api/jobs/add", checkAuth, Controller.Jobs.addJob);
router.get("/api/jobs/search", checkAuth, Controller.Jobs.searchJob);
router.get("/api/jobs/:id", checkAuth, Controller.Jobs.getJob);
router.delete("/api/jobs/:id", checkAuth, Controller.Jobs.removeJob);
router.post("/api/jobs/:id", checkAuth, Controller.Jobs.updateJob);
router.get("/api/jobs/display-job-cards", checkAuth, Controller.Jobs.displayJobCards);

//AI resume routes
router.post("/api/ai-resume/generate", checkAuth, Controller.AiResume.generateResume);
router.get("/api/ai-resume/:id", checkAuth, Controller.AiResume.getResumePrompts);

export default router;
