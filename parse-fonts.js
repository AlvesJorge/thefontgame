import fs from "node:fs";
const familiesFile = fs.readFileSync("families.csv", "utf-8");
const rows = familiesFile.split("\n");
const fonts = new Set();
rows.forEach((column) => fonts.add(column.split(",")[0]));

fs.writeFileSync("fonts.json", JSON.stringify({ "fonts": Array.from(fonts.values()) }));
