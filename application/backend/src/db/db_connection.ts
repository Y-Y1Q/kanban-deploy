import dotenv from "dotenv";
import * as path from "path";
import pgp, { IDatabase } from "pg-promise";

dotenv.config();

if (process.env.DATABASE_URL === undefined) {
  process.env.DATABASE_URL = "YOU_FORGOT_TO_SETUP_YOUR_ENVIRONMENT";
}

let db: IDatabase<any>;

// Connect to database
try {
  db = pgp()(process.env.DATABASE_URL);

  console.log("Connected to DB with URL:  " + `\x1b[32m\x1b[1m${process.env.DATABASE_URL} \x1b[0m`);
} catch (error) {
  console.log("Unable to connect to database");
}

// Helper function to load SQL files
function sql(file: string) {
  const fullPath = path.join(import.meta.dirname, file); // Generates full path to the file
  return new pgp.QueryFile(fullPath, { minify: true }); // Load and cache the SQL
}

export { db, sql };
