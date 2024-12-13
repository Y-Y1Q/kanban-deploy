import { Request, Response } from "express";
import { deleteContactById } from "../../db/contacts";

export const removeContact = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const success = await deleteContactById(Number(id));
    if (success) {
      res.status(200).send(`Contact deleted successfully.`);
    } else {
      res.status(500).send(`Error deleting contact.`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error deleting contact: ${errorMessage}`);
  }
};
