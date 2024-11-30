import { Request, Response } from "express";
import { createContact } from "../../db/contacts";

export const addContact = async (req: Request, res: Response) => {
  const session = req.session;

  // Validate session
  if (!session || !session.user || !session.user.id) {
    return res.status(400).json({ error: "User session is required." });
  }

  const { id: user_id } = session.user;
  const { name, email, company, position, phone_num, user_note } = req.body;

  // Validate input data
  if (!name || !email || !phone_num) {
    return res.status(400).json({ error: "name, email, and phone_num are required fields." });
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
      return res.status(201).json(contact);
    } else {
      return res.status(500).send("Error adding contact.");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).send(`Error adding contact: ${errorMessage}`);
  }
};
