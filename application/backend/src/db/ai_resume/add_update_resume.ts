import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { AiResume } from "../db_types";

export async function addUserResumeInput(user_id: number, resumeData: AiResume): Promise<boolean> {
  const query = SQL`
    INSERT INTO
      ai_resume (
        user_id,
        fullname,
        phone_num,
        email,
        linkedin,
        website,
        location,
        relevant_skills,
        education,
        experience,
        projects
      )
    VALUES
      (
        ${user_id},
        ${resumeData.fullname},
        ${resumeData.phone_num},
        ${resumeData.email},
        ${resumeData.linkedin},
        ${resumeData.website},
        ${resumeData.location},
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

export async function updateUserResumeInput(
  user_id: number,
  resumeData: Partial<AiResume>
): Promise<boolean> {
  const query = SQL`
    UPDATE ai_resume
    SET
      fullname = COALESCE(${resumeData.fullname}, fullname),
      phone_num = COALESCE(${resumeData.phone_num}, phone_num),
      email = COALESCE(${resumeData.email}, email),
      linkedin = COALESCE(${resumeData.linkedin}, linkedin),
      website = COALESCE(${resumeData.website}, website),
      location = COALESCE(${resumeData.location}, location),
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

export async function updateAiResumeInput(
  user_id: number,
  user_token: string,
  resumeData: Partial<AiResume>
): Promise<string | null> {
  const query = SQL`
    UPDATE ai_resume
    SET
      user_token = COALESCE(${user_token}, user_token),
      ai_skills = COALESCE(${resumeData.ai_skills}, ai_skills),
      ai_edu = COALESCE(${resumeData.ai_edu}, ai_edu),
      ai_exp = COALESCE(${resumeData.ai_exp}, ai_exp),
      ai_proj = COALESCE(${resumeData.ai_proj}, ai_proj)
    WHERE
      user_id = ${user_id}
    RETURNING
      user_token
  `;

  try {
    const result = await db.one<{ user_token: string }>(query.text, query.values);
    return result.user_token;
  } catch (error) {
    console.error(`Error updating user resume input for ID ${user_id}:`, error);
    return null;
  }
}

// const testData = {
//   fullname: "Update Name",
//   relevant_skills: "Update skill",
//   education: "Update edu",
//   experience: "Update exp",
//   projects: "Update proj",
//   ai_info: "Updated AI-generated personal information",
//   ai_skills: "Updated AI-generated skills",
//   ai_edu: "Updated AI-generated education",
//   ai_exp: "Updated AI-generated experience",
//   ai_proj: "Updated AI-generated projects",
// };

// const testData = {
//   fullname: "Test Name",
//   relevant_skills: null,
//   education: null,
//   experience: null,
//   projects: null,
// };

// import { testQuery } from "../db_test";
// testQuery(updateAiResumeInput, 1, "abc123xyz456", testData);
// testQuery(updateUserResumeInput, 1, testData);
// testQuery(addUserResumeInput, 1, testData);
// npx tsx .\src\db\ai_resume\add_update_resume.ts
