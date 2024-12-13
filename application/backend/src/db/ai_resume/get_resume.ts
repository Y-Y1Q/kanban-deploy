/* istanbul ignore file */
import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { AiResume } from "../db_types";

export async function getUserResumeInput(user_id: number): Promise<AiResume | null> {
  const query = SQL`
    SELECT
      fullname,
      user_token,
      phone_num,
      email,
      linkedin,
      website,
      location,
      relevant_skills,
      education,
      experience,
      projects
    FROM
      ai_resume
    WHERE
      user_id = ${user_id}
  `;

  try {
    const userInput = await db.oneOrNone<AiResume>(query.text, query.values);
    return userInput;
  } catch (error) {
    console.error(`Error fetching user input for ID ${user_id}:`, error);
    return null;
  }
}

export async function getAiResumeInput(user_token: string): Promise<AiResume | null> {
  const query = SQL`
    SELECT
      fullname,
      phone_num,
      email,
      linkedin,
      website,
      location,
      ai_skills,
      ai_edu,
      ai_exp,
      ai_proj
    FROM
      ai_resume
    WHERE
      user_token = ${user_token}
  `;

  try {
    const aiInput = await db.oneOrNone<AiResume>(query.text, query.values);
    return aiInput;
  } catch (error) {
    console.error(`Error fetching ai input for user token: ${user_token}:`, error);
    return null;
  }
}

export async function foundUserResume(user_id: number): Promise<boolean> {
  const query = SQL`
    SELECT
      EXISTS (
        SELECT
          1
        FROM
          ai_resume
        WHERE
          user_id = ${user_id}
      )
  `;

  try {
    const result = await db.one<{ exists: boolean }>(query.text, query.values);
    return result.exists;
  } catch (error) {
    return false;
  }
}

export async function foundUserToken(user_token: string): Promise<boolean> {
  const query = SQL`
    SELECT
      EXISTS (
        SELECT
          1
        FROM
          ai_resume
        WHERE
          user_token = ${user_token}
      )
  `;

  try {
    const result = await db.one<{ exists: boolean }>(query.text, query.values);
    return result.exists;
  } catch (error) {
    return false;
  }
}

export async function getUserResumeToken(user_id: number): Promise<string | null> {
  const query = SQL`
    SELECT
      user_token
    FROM
      ai_resume
    WHERE
      user_id = ${user_id}
  `;

  try {
    const result = await db.oneOrNone<{ user_token: string | null }>(query.text, query.values);
    return result ? result.user_token : null;
  } catch (error) {
    console.error(`Error retrieving user token for user_id ${user_id}:`, error);
    return null;
  }
}

// import { testQuery } from "../db_test";
// testQuery(getUserResumeToken, 1);
// testQuery(getUserResumeInput, 1);
// testQuery(foundUserResume, 1);
// testQuery(getAiResumeInput, "abc123xyz456");

// npx tsx .\src\db\ai_resume\get_resume.ts
