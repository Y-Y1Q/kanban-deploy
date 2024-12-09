import { Request, Response } from "express";

import * as ColumnDB from "../../db/columns";
import HttpCode from "../../constants/http_code";

export async function getCardsInColumn(req: Request, res: Response) {
  const { id: userId } = req.session.user!;
  const queryKey = req.query;
  const columnId = Number(req.params.id);

  try {
    let jobs;

    if (queryKey.company) {
      // Filter cards by company
      jobs = await ColumnDB.getColCardsByCompany(userId, queryKey.company as string, columnId);
    } else if (queryKey.type) {
      // Filter cards by type
      jobs = await ColumnDB.getColCardsByType(userId, queryKey.type as string, columnId);
    } else if (queryKey.location) {
      // Filter cards by location
      jobs = await ColumnDB.getColCardsByLocation(userId, queryKey.location as string, columnId);
    } else {
      // Fetch all cards in the column if no queryKey is provided
      jobs = await ColumnDB.getColCards(userId, columnId);
    }

    return res.status(HttpCode.OK).json({ jobs });
  } catch (err) {
    console.log(err);
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: "Internal server error: " + err });
  }
}
