import { findNcertForQuery } from "../../src/data/ncert/index";

const m = findNcertForQuery("balance the equation", 10);
console.log("match:", m ? m.chapter.id : null);

const m2 = findNcertForQuery("teach me chemical reactions and equations", 10);
console.log("match2:", m2 ? m2.chapter.id : null);

const m3 = findNcertForQuery("exercise 1.2", 10);
console.log("match3 (unlabelled decimal exercise):", JSON.stringify(m3));
