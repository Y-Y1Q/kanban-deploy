import { SQL } from "sql-template-strings";

import db from "../db_connection";

export async function deleteJobById(job_id: number): Promise<boolean> {
  const query = SQL`
    DELETE FROM jobs
    WHERE
      id = ${job_id}
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error(`Error deleting job record for ID ${job_id}:`, error);
    return false;
  }
}

// import { testQuery } from "../db_test";
// testQuery(deleteJob, 10);

// npx tsx .\src\db\jobs\delete_job.ts
