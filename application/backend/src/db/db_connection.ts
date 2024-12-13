/* istanbul ignore file */
import dotenv from "dotenv";
import pgp from "pg-promise";

dotenv.config();

if (process.env.DATABASE_URL === undefined) {
  process.env.DATABASE_URL = "YOU_FORGOT_TO_SETUP_YOUR_ENVIRONMENT";
} else {
  console.log(
    "\nConnecting to DB with URL:  " + `\x1b[32m\x1b[1m${process.env.DATABASE_URL} \x1b[0m\n`
  );
}

const pgpInstance = pgp();
const db = pgpInstance(process.env.DATABASE_URL);

export { pgpInstance as pgp };

export default db;
