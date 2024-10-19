import express from "express";
import { Request, Response } from "express";

import { Controller } from "../controllers";

const router = express.Router();

// Test
router.get("/", (_req: Request, res: Response) => {
  res.send("CSC 648 EzJobs");
});

// Auth routes
router.post("/api/auth/register", Controller.Auth.register);
router.post("/api/auth/login", Controller.Auth.login);
router.post("/api/auth/logout", Controller.Auth.logout);

//Jobs routes
router.post("/api/jobs/add", Controller.Jobs.addJob);
router.get("/api/jobs/search", Controller.Jobs.searchJob);
router.get("/api/jobs/:id", Controller.Jobs.getJob);
router.delete("/api/jobs/:id", Controller.Jobs.removeJob);
router.post("/api/jobs/:id", Controller.Jobs.updateJob);

//Column route
router.get("/api/columns", Controller.Columns.getColumns);

export default router;
