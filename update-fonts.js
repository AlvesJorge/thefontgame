import fs from "node:fs";
// const familiesFile = fs.readFileSync("families.csv", "utf-8");
const response = await fetch("https://raw.githubusercontent.com/google/fonts/main/tags/all/families.csv");
const responseText = await response.text();

const rows = responseText.split("\n");

// remove header row
rows.shift();

// there are repeated family names
const fonts = rows.map((column) => column.split(",")[0])
  .filter((font) => !font.startsWith("Noto Sans")
  && !font.startsWith("Playwrite")
  && !font.startsWith("IBM Plex Sans")
  && !font.startsWith("Libre Barcode")
  && !font.startsWith("Noto Serif")
  && font.length > 0);
fonts.push("Noto Sans", "Noto Serif", "IBM Plex Sans", "Playwrite US Modern", "Libre Barcode 39 Text");

fs.writeFileSync("assets/fonts.json", JSON.stringify({ "fonts": Array.from(new Set(fonts).values()) }));
