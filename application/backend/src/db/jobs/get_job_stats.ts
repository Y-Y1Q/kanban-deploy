import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { JobStats, DateStats } from "../db_types";

export async function getJobStats(user_id: number): Promise<JobStats[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      job_stats
    WHERE
      user_id = ${user_id}
  `;
  try {
    const jobs = await db.manyOrNone<JobStats>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job_stats data:`, error);
    return null;
  }
}

export async function getDateStats(user_id: number): Promise<DateStats[] | null> {
  const query = SQL`
    SELECT
      TO_CHAR(date_applied, 'YYYY-MM-DD') AS date_applied,
      COUNT(*) AS COUNT
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND date_applied IS NOT NULL
    GROUP BY
      date_applied
    ORDER BY
      date_applied;
  `;
  try {
    const dates = await db.manyOrNone<DateStats>(query.text, query.values);
    return dates;
  } catch (error) {
    console.error(`Error fetching job_stats data:`, error);
    return null;
  }
}

// import { testQuery } from "../db_test";

// testQuery(getDateStats, 1);
// npx tsx .\src\db\jobs\get_job_stats.ts
