import { Request, Response } from "express";
import { createContact } from "../../db/contacts";

export const addContact = async (req: Request, res: Response): Promise<void> => {
  const { user_id, name, email, company, position, phone_num, user_note } = req.body;
  try {
    const contact = await createContact(user_id, name, email, company, position, phone_num, user_note);
    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(500).send(`Error adding contact.`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error adding contact: ${errorMessage}`);
  }
};
