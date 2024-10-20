// General test function to test query
// use `npx tsx` to run the query file you want to test
/*
Usage:

import { testQuery } from "../db_test";

testQuery(queryFuncToTest, paramsToTest)
*/
export async function testQuery(queryFunction: (...args: any[]) => Promise<any>, ...params: any[]) {
  try {
    console.log(`Running query with params: ${JSON.stringify(params)}`);
    const result = await queryFunction(...params);
    console.log("Query Result:", result);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
