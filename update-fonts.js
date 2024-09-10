import fs from "node:fs";
// const familiesFile = fs.readFileSync("families.csv", "utf-8");
const response = await fetch("https://raw.githubusercontent.com/google/fonts/main/tags/all/families.csv");
const responseText = await response.text();

const rows = responseText.split("\n");

// remove header row
rows.shift();

// there are repeated family names
const fonts = new Set();
rows.forEach((column) => fonts.add(column.split(",")[0]));

fs.writeFileSync("assets/fonts.json", JSON.stringify({ "fonts": Array.from(fonts.values()) }));
