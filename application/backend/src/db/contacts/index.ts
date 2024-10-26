import db from "../db_connection";
import { testQuery } from "../db_test";
import { Contact } from "../db_types";

export async function addContact(name: string, email: string): Promise<void> {
  const query = "INSERT INTO users (name, email) VALUES ($1, $2)";

  try {
    await db.none(query, [name, email]);
    console.log(`Contact with name ${name} added successfully.`);
  } catch (error) {
    console.error(`Error adding contact with name ${name}:`, error);
  }
}

testQuery(addContact, "John Doe", "something@email.com");

// export async function getContactById(id: number): Promise<Contact | null> {
//   const query = "SELECT id, username, email FROM users WHERE id = $1";

//   try {
//     const contact = await db.oneOrNone<Contact>(query, [id]);
//     return contact;
//   } catch (error) {
//     console.error(`Error fetching contact for ID ${id}:`, error);
//     return null;
//   }
// }

// export async function updateContactEmailById(id: number, email: string): Promise<void> {
//   const query = "UPDATE users SET email = $1 WHERE id = $2";

//   try {
//     await db.none(query, [email, id]);
//     console.log(`Contact with ID ${id} updated successfully.`);
//   } catch (error) {
//     console.error(`Error updating contact for ID ${id}:`, error);
//   }
// }

// export async function deleteContactById(id: number): Promise<void> {
//   const query = "DELETE FROM users WHERE id = $1";

//   try {
//     await db.none(query, [id]);
//     console.log(`Contact with ID ${id} deleted successfully.`);
//   } catch (error) {
//     console.error(`Error deleting contact for ID ${id}:`, error);
//   }
// }

// run npx tsx .\src\db\contacts\index.ts to test
// Adds user

//testQuery(getContactById, 1);
//testQuery(updateContactEmailById, 1, "newemail@example.com");

// Deletes user
//testQuery(deleteContactById, 1);
