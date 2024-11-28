/* istanbul ignore file */
import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { User } from "../db_types";

export async function getUserById(id: number): Promise<User | null> {
  const query = SQL`
    SELECT
      id,
      username,
      email
    FROM
      users
    WHERE
      id = ${id}
  `;

  try {
    const user = await db.oneOrNone<User>(query.text, query.values);
    return user;
  } catch (error) {
    console.error(`Error fetching user for ID ${id}:`, error);
    return null;
  }
}

export async function getUser(username: string): Promise<User | null> {
  const query = SQL`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;

  try {
    const user = await db.oneOrNone<User>(query.text, query.values);
    return user;
  } catch (error) {
    console.error(`Error fetching user for username ${username}:`, error);
    return null;
  }
}

export async function addUser(username: string, password: string, email: string) {
  const query = SQL`
    INSERT INTO
      users (username, password, email)
    VALUES
      (
        ${username},
        ${password},
        ${email}
      )
    RETURNING
      id,
      username,
      email
  `;

  try {
    const user = await db.oneOrNone<User>(query.text, query.values);
    return user;
  } catch (error) {
    console.error(`Error adding new user: `, error);
    return null;
  }
}

export async function foundUser(username: string): Promise<boolean> {
  const query = SQL`
    SELECT
      EXISTS (
        SELECT
          1
        FROM
          users
        WHERE
          username = ${username}
      )
  `;

  try {
    const result = await db.one<{ exists: boolean }>(query.text, query.values);
    return result.exists;
  } catch (error) {
    return false;
  }
}

export async function foundEmail(email: string): Promise<boolean> {
  const query = SQL`
    SELECT
      EXISTS (
        SELECT
          1
        FROM
          users
        WHERE
          email = ${email}
      )
  `;

  try {
    const result = await db.one<{ exists: boolean }>(query.text, query.values);
    return result.exists;
  } catch (error) {
    return false;
  }
}
