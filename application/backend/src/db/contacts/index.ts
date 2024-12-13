/* istanbul ignore file */
import db from "../db_connection";
// import { testQuery } from "../db_test";
import { Contact } from "../db_types";
import { SQL } from "sql-template-strings";


export async function createContact(
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

// This function will return all contacts if no searchParam is provided
// Otherwise, it will return contacts that match the searchParam
export async function getContacts(searchParam: string): Promise<Contact[] | null> {
  let query;
  if (searchParam) {
    query = SQL`
      SELECT
        *
      FROM
        contacts
      WHERE
        name ILIKE '%' || ${searchParam} || '%'
        OR company ILIKE '%' || ${searchParam} || '%'
        OR POSITION ILIKE '%' || ${searchParam} || '%'
        OR email ILIKE '%' || ${searchParam} || '%'
    `;
  } else {
    query = SQL`
      SELECT
        *
      FROM
        contacts
    `;
  }

  try {
    const contacts = await db.manyOrNone<Contact>(query.text, query.values);
    return contacts;
  } catch (error) {
    console.error(`Error fetching contacts:`, error);
    return null;
  }
}

export async function updateContact(
  id: number,
  contactData: Partial<Contact>
): Promise<boolean> {
  const query = SQL`
    UPDATE contacts
    SET
      name = COALESCE(${contactData.name}, name),
      email = COALESCE(${contactData.email}, email),
      company = COALESCE(${contactData.company}, company),
      position = COALESCE(${contactData.position}, position),
      phone_num = COALESCE(${contactData.phone_num}, phone_num),
      user_note = COALESCE(${contactData.user_note}, user_note)
    WHERE
      id = ${id}
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error(`Error updating contact with ID ${id}:`, error);
    return false;
  }
}

// run npx tsx .\src\db\contacts\index.ts to test
// Adds contact //
// testQuery(
//   createContact,
//   1,
//   "John Doe",
//   "something@email.com",
//   "Company1",
//   "Position1",
//   "1234567890",
//   "blah"
// );


// Deletes contact // 2nd parameter is the id of the contact //
// testQuery(deleteContactById, 12);


// Gets Contacts //
// If query doesn't have any parameter from the database,
// then it will return just empty array.

// Empty string will return all contacts
//testQuery(getContacts, "");

// By name
//testQuery(getContacts, "Jane Smith");

// By company
//testQuery(getContacts, "CompanyA");

// By position
//testQuery(getContacts, "CEO");

// By email
//testQuery(getContacts, "emily");


// Updates Contact
// Test data
// const contactId = 11;
// const contactData = {
//   name: "Updated Name",
//   email: "updated.email@example.com",
//   company: "Updated Company",
//   position: "Updated Position",
//   phone_num: "9876543210",
//   user_note: "Updated note",
// };

// Runs the test
// testQuery(updateContact, contactId, contactData);