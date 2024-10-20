import { db, sql } from "../db_connection";
// import { testQuery } from "../db_test";
import { User } from "../db_types";

export async function getUserById(id: number): Promise<User | null> {
  const query = sql("./users/get_user_by_id.sql");

  try {
    const user = await db.oneOrNone<User>(query, { id });
    return user;
  } catch (error) {
    console.error(`Error fetching user for ID ${id}:`, error);
    return null;
  }
}

// testQuery(getUserById, 1);
