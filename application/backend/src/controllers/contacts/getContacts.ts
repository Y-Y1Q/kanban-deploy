import { Request, Response } from "express";
import { getContacts } from "../../db/contacts";

export const getContact = async (req: Request, res: Response): Promise<void> => {
  const { searchParam } = req.query as { searchParam: string };
  console.log(`Received searchParam: ${searchParam}`);
  try {
    const contacts = await getContacts(searchParam || "");
    console.log(`Fetched contacts: ${JSON.stringify(contacts)}`);
    if (contacts && contacts.length > 0) {
      res.status(200).json(contacts);
    } else {
      res.status(404).send(`Contacts not found.`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`Error getting contacts: ${errorMessage}`);
    res.status(500).send(`Error getting contacts: ${errorMessage}`);
  }
};
