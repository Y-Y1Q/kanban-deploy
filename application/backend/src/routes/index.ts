import express from "express";

import { Controller } from "../controllers";
import { checkAuth } from "../middleware/check_auth";

const router = express.Router();

// Auth routes
router.post("/api/auth/check", Controller.Auth.isAuthenticated);
router.post("/api/auth/sign-up", Controller.Auth.signUp);
router.post("/api/auth/sign-in", Controller.Auth.signIn);
router.post("/api/auth/sign-out", Controller.Auth.signOut);
router.post("/api/auth/user-info", Controller.Auth.getUserInfo);

/* All API routes below are for authenticated user */
// M2 Job routes ( will update to use query param later)
router.get("/api/jobs", checkAuth, Controller.Jobs.getJobs);
router.get("/api/jobs/company", checkAuth, Controller.Jobs.getJobsByCompany);
router.get("/api/jobs/type", checkAuth, Controller.Jobs.getJobsByType);

// //Jobs routes
// router.post("/api/jobs/add", checkAuth, Controller.Jobs.addJob);
// router.get("/api/jobs/search", checkAuth, Controller.Jobs.searchJob);
// router.get("/api/jobs/:id", checkAuth, Controller.Jobs.getJob);
// router.delete("/api/jobs/:id", checkAuth, Controller.Jobs.removeJob);
// router.post("/api/jobs/:id", checkAuth, Controller.Jobs.updateJob);
// router.get("/api/jobs/display-job-cards", checkAuth, Controller.Jobs.displayJobCards);

// //AI resume routes
// router.post("/api/ai-resume/generate", checkAuth, Controller.AiResume.generateResume);
// router.get("/api/ai-resume/:id", checkAuth, Controller.AiResume.getResumePrompts);


// Contacts routes
router.post("/api/contacts/add", checkAuth, Controller.Contacts.addContact);
router.get("/api/contacts/search", checkAuth, Controller.Contacts.getContact);
router.delete("/api/contacts/:id", checkAuth, Controller.Contacts.removeContact);

export default router;
