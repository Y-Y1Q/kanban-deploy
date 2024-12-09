import { Request, Response } from "express";
import { updateJobColumn } from "../../db/columns";
import HttpCode from "../../constants/http_code";

export async function updateJobCardStatus(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const jobId = Number(req.params.id);
  const { column_id: columnId, current_status: currentStatus } = req.body.jobData!;

  try {
    const success = await updateJobColumn(userId, jobId, columnId, currentStatus);

    if (success) {
      return res.status(HttpCode.OK).json({ message: "Job entry updated successfully." });
    } else {
      return res.status(HttpCode.BadRequest).json({ error: "Failed to update job entry." });
    }
  } catch (error) {
    console.error("Error adding job entry:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Failed to update job entry." });
  }
}
