import express from "express";
import { Request, Response } from "express";

const router = express.Router();

// Test
router.get("/", (_req: Request, res: Response) => {
  res.send("CSC 648 EzJobs");
});

export default router;
