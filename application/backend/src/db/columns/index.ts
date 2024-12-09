/* istanbul ignore file */
import { SQL } from "sql-template-strings";

import db from "../db_connection";
import { Job } from "../db_types";

export async function getColCardsByCompany(
  user_id: number,
  company: string,
  column_id: number
): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND column_id = ${column_id}
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

export async function getColCardsByType(
  user_id: number,
  type: string,
  column_id: number
): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND column_id = ${column_id}
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

export async function getColCardsByLocation(
  user_id: number,
  location: string,
  column_id: number
): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND column_id = ${column_id}
      AND location ILIKE '%' || ${location} || '%';
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}

export async function getColCards(user_id: number, column_id: number): Promise<Job[] | null> {
  const query = SQL`
    SELECT
      *
    FROM
      jobs
    WHERE
      user_id = ${user_id}
      AND column_id = ${column_id}
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}
