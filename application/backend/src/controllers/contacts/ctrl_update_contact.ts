import { Request, Response } from "express";
import { updateContact } from "../../db/contacts";
import HttpCode from "../../constants/http_code";

export const updateContacts = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contactData = req.body;

  try {
    const success = await updateContact(Number(id), contactData);

    if (success) {
      return res.status(HttpCode.OK).json({ message: "Contact updated successfully." });
    } else {
      return res.status(HttpCode.BadRequest).json({ error: "Failed to update contact." });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(HttpCode.InternalServerError).json({ error: "Failed to update contact." });
  }
};