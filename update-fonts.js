import fs from "node:fs";
// const familiesFile = fs.readFileSync("families.csv", "utf-8");
const response = await fetch("https://raw.githubusercontent.com/google/fonts/main/tags/all/families.csv");
const responseText = await response.text();

const rows = responseText.split("\n");

// remove header row
rows.shift();

const fonts = rows.map((column) => column.split(",")[0])
  .filter((font) =>
    !font.startsWith("Noto Sans") // many repeats
    && !font.startsWith("Playwrite") // many repeats
    && !font.startsWith("IBM Plex Sans") // many repeats
    && !font.startsWith("Libre Barcode") // many semi repeats
    && !font.startsWith("Noto Serif") // many repeats
    && !font.startsWith("Ponnala") // unsure why but this one does not exist on google fonts
    && font.length > 0); // there's an empty one in there

// add one of each of the repeats
fonts.push("Noto Sans", "Noto Serif", "IBM Plex Sans", "Playwrite US Modern", "Libre Barcode 39 Text");

fs.writeFileSync("assets/fonts.json", JSON.stringify({ "fonts": Array.from(new Set(fonts).values()) }));
