import db from "../db_connection";
import { testQuery } from "../db_test";
import { Contact } from "../db_types";

export async function addContact(
  id: number,
  username: string,
  email: string,
  password: string
): Promise<void> {
  const checkQuery = "SELECT id FROM users WHERE id = $1";
  const insertQuery = `
      INSERT INTO users (id, username, email, password)
      VALUES ($1, $2, $3, $4)
    `;

  try {
    const existingContact = await db.oneOrNone(checkQuery, [id]);
    if (existingContact) {
      console.error(`Contact with ID ${id} already exists.`);
      return;
    }

    await db.none(insertQuery, [id, username, email, password]);
    console.log(`Contact ${username} added successfully.`);
  } catch (error) {
    console.error(`Error adding contact ${username}:`, error);
  }
}

export async function getContactById(id: number): Promise<Contact | null> {
  const query = "SELECT id, username, email FROM users WHERE id = $1";

  try {
    const contact = await db.oneOrNone<Contact>(query, [id]);
    return contact;
  } catch (error) {
    console.error(`Error fetching contact for ID ${id}:`, error);
    return null;
  }
}

export async function updateContactEmailById(id: number, email: string): Promise<void> {
  const query = "UPDATE users SET email = $1 WHERE id = $2";

  try {
    await db.none(query, [email, id]);
    console.log(`Contact with ID ${id} updated successfully.`);
  } catch (error) {
    console.error(`Error updating contact for ID ${id}:`, error);
  }
}

export async function deleteContactById(id: number): Promise<void> {
  const query = "DELETE FROM users WHERE id = $1";

  try {
    await db.none(query, [id]);
    console.log(`Contact with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting contact for ID ${id}:`, error);
  }
}

// run npx tsx .\src\db\contacts\index.ts to test
// Adds user
testQuery(addContact, 1, "username1", "email@example.com", "randompassword");
testQuery(getContactById, 1);
testQuery(updateContactEmailById, 1, "newemail@example.com");

// Deletes user
//testQuery(deleteContactById, 1);
