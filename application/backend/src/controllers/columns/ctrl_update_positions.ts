import { Request, Response } from "express";
import db from "../../db/db_connection";

export async function updateMultiplePositions(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const columnId = Number(req.params.id);
  const { updatedCards } = req.body;

  try {
    const queries = updatedCards.map((card: { id: number; card_pos: number }) => ({
      query: `UPDATE jobs SET card_pos = $1 WHERE id = $2 AND column_id = $3 AND user_id = $4`,
      values: [card.card_pos, card.id, columnId, userId],
    }));

    for (const { query, values } of queries) {
      await db.query(query, values);
    }

    res.status(200).json({ message: "Card positions updated successfully." });
  } catch (error) {
    console.error("Error updating card positions:", error);
    res.status(500).json({ error: "Failed to update card positions." });
  }
}
