import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { AiResume } from "../db_types";

export async function addUserResumeInput(user_id: number, resumeData: AiResume): Promise<boolean> {
  const query = SQL`
    INSERT INTO
      ai_resume (
        user_id,
        fullname,
        personal_information,
        relevant_skills,
        education,
        experience,
        projects
      )
    VALUES
      (
        ${user_id},
        ${resumeData.fullname},
        ${resumeData.personal_information},
        ${resumeData.relevant_skills},
        ${resumeData.education},
        ${resumeData.experience},
        ${resumeData.projects}
      )
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error("Error inserting new user resume input:", error);
    return false;
  }
}

// const testData = {
//   fullname: "Test Name",
//   personal_information: "Test Info",
//   relevant_skills: null,
//   education: null,
//   experience: null,
//   projects: null,
// };

// import { testQuery } from "../db_test";
// testQuery(addUserResumeInput, 1, testData);

// npx tsx .\src\db\ai_resume\add_resume.ts
