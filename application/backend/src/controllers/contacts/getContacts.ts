import { Request, Response } from "express";
import { getContacts } from "../../db/contacts";

export const getContact = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const contact = await getContacts(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).send(`Contact not found.`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error getting contact: ${errorMessage}`);
  }
};