import { Request, Response } from "express";
import { updateJobColumn, updateJobCardPosition } from "../../db/columns";
import HttpCode from "../../constants/http_code";

export async function updateJobCardStatus(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const jobId = Number(req.params.id);
  const {
    column_id: columnId,
    current_status: currentStatus,
    card_pos: cardPos,
  } = req.body.jobData!;

  console.log("\n\nPOS: " + cardPos);

  try {
    const success = await updateJobColumn(userId, jobId, columnId, cardPos, currentStatus);

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

export async function updateCardPosition(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const jobId = Number(req.params.id);
  const { card_pos } = req.body;

  console.log("\n\nPOS: " + card_pos);

  try {
    const success = await updateJobCardPosition(userId, jobId, card_pos);

    if (success) {
      res.status(200).json({ message: "Card position updated successfully." });
    } else {
      res.status(400).json({ error: "Failed to update card position." });
    }
  } catch (error) {
    console.error("Error updating card position:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
}
