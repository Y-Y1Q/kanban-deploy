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
      AND company ILIKE '%' || ${company} || '%'
    ORDER BY
      card_pos;
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
      AND type ILIKE '%' || ${type} || '%'
    ORDER BY
      card_pos;
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
      AND location ILIKE '%' || ${location} || '%'
    ORDER BY
      card_pos;
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
    ORDER BY
      card_pos
  `;

  try {
    const jobs = await db.manyOrNone<Job>(query.text, query.values);
    return jobs;
  } catch (error) {
    console.error(`Error fetching job data:`, error);
    return null;
  }
}

export async function updateJobColumn(
  user_id: number,
  job_id: number,
  column_id: number,
  card_pos: number,
  current_status: string
): Promise<boolean> {
  const query = SQL`
    UPDATE jobs
    SET
      column_id = COALESCE(${column_id}, column_id),
      current_status = COALESCE(${current_status}, POSITION),
      card_pos = COALESCE(${card_pos}, card_pos)
    WHERE
      id = ${job_id}
      AND user_id = ${user_id}
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error(`Error updating job's column with ID ${job_id}:`, error);
    return false;
  }
}

export async function updateJobCardPosition(
  user_id: number,
  job_id: number,
  card_pos: number
): Promise<boolean> {
  const query = SQL`
    UPDATE jobs
    SET
      card_pos = COALESCE(${card_pos}, card_pos)
    WHERE
      id = ${job_id}
      AND user_id = ${user_id}
  `;

  try {
    await db.none(query.text, query.values);
    return true;
  } catch (error) {
    console.error(`Error updating job card with ID ${job_id}:`, error);
    return false;
  }
}
