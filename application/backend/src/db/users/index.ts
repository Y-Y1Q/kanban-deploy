import { db, sql } from "../db_connection";
import { User } from "../db_types";

export async function getUserById(id: number): Promise<User | null> {
  const query = sql("./users/sql/get_user_by_id.sql");

  try {
    const user = await db.oneOrNone<User>(query, { id });
    return user;
  } catch (error) {
    console.error(`Error fetching user for ID ${id}:`, error);
    return null;
  }
}

export async function getUser(username: string): Promise<User | null> {
  const query = sql("./users/sql/get_user_by_username.sql");

  try {
    const user = await db.oneOrNone<User>(query, { username });
    return user;
  } catch (error) {
    console.error(`Error fetching user for username ${username}:`, error);
    return null;
  }
}

export async function addUser(username: string, password: string, email: string) {
  const query = sql("./users/sql/add_user.sql");

  try {
    const user = await db.oneOrNone<User>(query, { username, password, email });
    return user;
  } catch (error) {
    console.error(`Error adding new user: `, error);
    return null;
  }
}

export async function foundUser(username: string): Promise<boolean> {
  const query = sql("./users/sql/find_user_by_username.sql");

  try {
    await db.one<User>(query, { username });
    return true;
  } catch (error) {
    console.error(`Cannot find username ${username}: `, error);
    return false;
  }
}
