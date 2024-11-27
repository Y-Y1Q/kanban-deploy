/* istanbul ignore file */
import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { Job } from "../db_types";

export async function getJobsByCompany(user_id: number, company: string): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND company ILIKE '%' || ${company} || '%';
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}

export async function getJobsByType(user_id: number, type: string): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND type ILIKE '%' || ${type} || '%';
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}

export async function getJobs(user_id: number): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}

export async function getJobById(job_id: number): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      id = ${job_id}
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}

// import { testQuery } from "../db_test";
// testQuery(getJobById, 1);

// npx tsx .\src\db\jobs\get_jobs.ts
