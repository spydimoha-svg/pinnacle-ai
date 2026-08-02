import { statSync } from "node:fs";
console.log(statSync("public/landing/scan-color.png").size);
