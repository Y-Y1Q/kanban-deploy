import { db } from '../db_connection';
import { Contact } from '../db_types';

export const addContact = async (id: number, username: string, email: string, password: string): Promise<void> => {
  const checkQuery = "SELECT id FROM users WHERE id = $1";
  const insertQuery = `
    INSERT INTO users (id, username, email, password)
    VALUES ($1, $2, $3, $4)
  `;
  const existingContact = await db.oneOrNone(checkQuery, [id]);
  if (existingContact) {
    throw new Error(`Contact with ID ${id} already exists.`);
  }
  await db.none(insertQuery, [id, username, email, password]);
};

export const getContactById = async (id: number): Promise<Contact | null> => {
  const query = "SELECT id, username, email FROM users WHERE id = $1";
  return await db.oneOrNone<Contact>(query, [id]);
};

export const updateContactEmailById = async (id: number, email: string): Promise<void> => {
  const query = "UPDATE users SET email = $1 WHERE id = $2";
  await db.none(query, [email, id]);
};

export const deleteContactById = async (id: number): Promise<void> => {
  const query = "DELETE FROM users WHERE id = $1";
  await db.none(query, [id]);
};