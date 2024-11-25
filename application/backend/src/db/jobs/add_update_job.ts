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

export async function updateJob(job_id: number, jobData: Partial<JobData>): Promise<boolean> {
  const query = `
    UPDATE jobs
    SET
      current_status = COALESCE('${jobData.current_status}', current_status),
      company = COALESCE('${jobData.company}', company),
      position = COALESCE('${jobData.position}', position),
      salary = COALESCE('${jobData.salary}', salary),
      type = COALESCE('${jobData.type}', type),
      location = COALESCE('${jobData.location}', location),
      link = COALESCE('${jobData.link}', link),
      description = COALESCE('${jobData.description}', description),
      user_note = COALESCE('${jobData.user_note}', user_note),
      date_applied = COALESCE(${jobData.date_applied ? `'${jobData.date_applied}'` : "NULL"}, date_applied),
      date_scheduled = COALESCE(${jobData.date_scheduled ? `'${jobData.date_scheduled}'` : "NULL"}, date_scheduled)
    WHERE id = ${job_id}
  `;

  try {
    await db.none(query);
    return true;
  } catch (error) {
    console.error(`Error updating job with ID ${job_id}:`, error);
    return false;
  }
}

/*
TEST QUERY
*/

// import { testQuery } from "../db_test";

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
//   date_applied: new Date("2024-01-01").toISOString().split("T")[0],
//   date_scheduled: null, // Optional - no interview scheduled yet
// };

// testQuery(addJob, 1, 1, testData);
// testQuery(updateJob, 1, testData);

// tsx .\src\db\jobs\add_update_job.ts
