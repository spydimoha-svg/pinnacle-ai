import { findNcertForQuery } from "../src/data/ncert/index.ts";
const m = findNcertForQuery("teach me life processes", 10);
console.log(m ? m.chapter.id + " : " + m.chapter.title : "NO MATCH");
import { unlinkSync } from "fs";
unlinkSync(new URL(import.meta.url));
