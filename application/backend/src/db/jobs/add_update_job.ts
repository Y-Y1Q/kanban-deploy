import { SQL } from "sql-template-strings";
import db from "../db_connection";
import { JobData } from "../db_types";

export async function addJob(
  user_id: number,
  column_id: number,
  jobData: JobData
): Promise<boolean> {
  const query = SQL`
    INSERT INTO
      jobs (
        user_id,
        column_id,
        current_status,
        company,
        POSITION,
        salary,
        type,
        location,
        link,
        description,
        user_note,
        date_applied,
        date_scheduled
      )
    VALUES
      (
        ${user_id},
        ${column_id},
        ${jobData.current_status},
        ${jobData.company},
        ${jobData.position},
        ${jobData.salary || null},
        ${jobData.type || null},
        ${jobData.location || null},
        ${jobData.link || null},
        ${jobData.description || null},
        ${jobData.user_note || null},
        ${jobData.date_applied || null},
        ${jobData.date_scheduled || null}
      );
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error("Error inserting new job entry:", error);
    return false;
  }
}

// const testData: JobData = {
//   current_status: "applied",
//   company: "OpenAI",
//   position: "Software Engineer",
//   salary: "120000", // Optional
//   type: "Full-time", // Optional
//   location: "Remote", // Optional
//   link: null, // Optional
//   description: "Work on developing and deploying state-of-the-art AI models.", // Optional
//   user_note: "Follow up in two weeks.", // Optional
//   date_applied: new Date("2024-10-15"), // Optional
//   date_scheduled: null, // Optional - no interview scheduled yet
// };

// import { testQuery } from "../db_test";

// testQuery(addJob, 1, 1, testData);

// tsx .\src\db\jobs\add_update_job.ts
