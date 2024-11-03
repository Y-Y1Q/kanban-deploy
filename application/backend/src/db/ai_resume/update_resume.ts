import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { AiResume } from "../db_types";

export async function updateUserResumeInput(
  user_id: number,
  resumeData: Partial<AiResume>
): Promise<boolean> {
  const query = SQL`
    UPDATE ai_resume
    SET
      fullname = COALESCE(${resumeData.fullname}, fullname),
      personal_information = COALESCE(
        ${resumeData.personal_information},
        personal_information
      ),
      relevant_skills = COALESCE(
        ${resumeData.relevant_skills},
        relevant_skills
      ),
      education = COALESCE(${resumeData.education}, education),
      experience = COALESCE(${resumeData.experience}, experience),
      projects = COALESCE(${resumeData.projects}, projects)
    WHERE
      user_id = ${user_id}
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error(`Error updating user resume input for ID ${user_id}:`, error);
    return false;
  }
}

// const testData = {
//   fullname: "Update Name",
//   personal_information: null,
//   relevant_skills: "Update skill",
//   education: "Update edu",
//   experience: "Update exp",
//   projects: "Update proj",
// };

// import { testQuery } from "../db_test";
// testQuery(updateUserResumeInput, 1, testData);

// npx tsx .\src\db\ai_resume\update_resume.ts
