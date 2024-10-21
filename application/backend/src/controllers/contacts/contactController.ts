// import { Request, Response } from 'express';
// import { addContact, getContactById, updateContactEmailById, deleteContactById } from '../services/contactService';

// export const createContact = async (req: Request, res: Response): Promise<void> => {
//   const { id, username, email, password } = req.body;
//   try {
//     await addContact(id, username, email, password);
//     res.status(201).send(`Contact ${username} added successfully.`);
//   } catch (error) {
//     res.status(500).send(`Error adding contact ${username}: ${error.message}`);
//   }
// };

// export const retrieveContactById = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   try {
//     const contact = await getContactById(Number(id));
//     if (contact) {
//       res.status(200).json(contact);
//     } else {
//       res.status(404).send(`Contact with ID ${id} not found.`);
//     }
//   } catch (error) {
//     res.status(500).send(`Error retrieving contact for ID ${id}: ${error.message}`);
//   }
// };

// export const updateContactEmail = async (req: Request, res: Response): Promise<void> => {
//   const { id, email } = req.body;
//   try {
//     await updateContactEmailById(id, email);
//     res.status(200).send(`Contact with ID ${id} updated successfully.`);
//   } catch (error) {
//     res.status(500).send(`Error updating contact for ID ${id}: ${error.message}`);
//   }
// };

// export const deleteContact = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   try {
//     await deleteContactById(Number(id));
//     res.status(200).send(`Contact with ID ${id} deleted successfully.`);
//   } catch (error) {
//     res.status(500).send(`Error deleting contact for ID ${id}: ${error.message}`);
//   }
// };
