import { LexoRank } from "lexorank";

const middleLexoRank = LexoRank.middle();
console.log(`middleLexoRank: ${middleLexoRank}`);

const next1 = middleLexoRank.genNext();
console.log(next1.toString());

const next2 = next1.genNext();
console.log(next2.toString());

const parsedLexoRank = LexoRank.parse("0|hzzzzz:");
console.log(parsedLexoRank.toString());

const next3 = parsedLexoRank.genNext();
console.log(next3.toString());

// npx tsx .\src\controllers\columns\test.ts
