import db from "../db_connection";
import { testQuery } from "../db_test";
import { Contact } from "../db_types";

export async function addContact(
  user_id: number,
  name: string,
  email: string,
  company: string,
  position: string,
  phone_num: string,
  user_note: string
): Promise<Contact | null> {
  const query = `
    INSERT INTO contacts (user_id, name, email, company, position, phone_num, user_note)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id, user_id, name, email, company, position, phone_num, user_note
  `;

  try {
    const contact = await db.oneOrNone<Contact>(query, [
      user_id,
      name,
      email,
      company,
      position,
      phone_num,
      user_note,
    ]);
    return contact;
  } catch (error) {
    console.error(`Error adding new contact: `, error);
    return null;
  }
}

// TODO: get (individual searches and if empty, return all), search (name, company, position, and email), delete contacts (user id)

export async function deleteContactById(id: number): Promise<boolean> {
  const query = `
    DELETE FROM contacts
    WHERE id = $1
  `;

  try {
    await db.none(query, [id]);
    return true;
  } catch (error) {
    console.error(`Error deleting contact for user_id ${id}:`, error);
    return false;
  }
}


// run npx tsx .\src\db\contacts\index.ts to test
// Adds contact
// testQuery(
//   addContact,
//   1,
//   "John Doe",
//   "something@email.com",
//   "Company1",
//   "Position1",
//   "1234567890",
//   "blah"
// );

// Deletes contact
testQuery(deleteContactById, 12);