import { Request, Response } from "express";
import { createContact } from "../../db/contacts";

export const addContact = async (req: Request, res: Response): Promise<void> => {
  const { user_id, name, email, company, position, phone_num, user_note } = req.body;

  // Validate input data
  if (!user_id || !name || !email || !phone_num) {
    res.status(400).json({ error: "user_id, name, email, and phone_num are required fields." });
    return; // Add return to prevent further execution
  }

  try {
    const contact = await createContact(
      user_id,
      name,
      email,
      company,
      position,
      phone_num,
      user_note
    );

    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(500).send("Error adding contact.");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).send(`Error adding contact: ${errorMessage}`);
  }
};
