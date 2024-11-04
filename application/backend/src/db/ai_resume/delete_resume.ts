import { SQL } from "sql-template-strings";

import db from "../db_connection";

export async function deleteUserResumeRecord(user_id: number): Promise<boolean> {
  const query = SQL`
    DELETE FROM ai_resume
    WHERE
      user_id = ${user_id}
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error(`Error deleting user resume input for ID ${user_id}:`, error);
    return false;
  }
}

// import { testQuery } from "../db_test";
// testQuery(deleteUserResumeInput, 1);

// npx tsx .\src\db\ai_resume\delete_resume.ts
