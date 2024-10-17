import dotenv from "dotenv";
import pgp, { IDatabase } from "pg-promise";

dotenv.config();

if (process.env.DATABASE_URL === undefined) {
  process.env.DATABASE_URL = "YOU_FORGOT_TO_SETUP_YOUR_ENVIRONMENT";
}

let db: IDatabase<any>;

try {
  db = pgp()(process.env.DATABASE_URL);

  console.log(
    "Connected to DB with URL:  " +
      `\x1b[32m\x1b[1m${process.env.DATABASE_URL} \x1b[0m`
  );
} catch (error) {
  console.log("Unable to connect to database");
}

export { db };