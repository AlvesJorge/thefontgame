import fs from "node:fs";

const RESTRICTED_STARTING_KEYWORDS = [
  "Playwrite", // many repeats
  "IBM Plex Sans", // many repeats
  "Baloo", // many repeats
  "Noto Sans",
  "Noto Serif", // many repeats
  "Big Shoulders", // a few semi repeats
  "IM Fell", // many variations, including some SC ones which should probably be included
  // "Bungee", // a few semi repeats, outline, color etc...
  // "Cormorant", // a few semi repeats, variations of same font
  "Lexend", // quite a few repeats, with different letter spacing
  "Kaisei", // a few repeats
  "Hind", // many repeats
  "Fira Sans", // a few repeats
  "Encode Sans", // a few repeats
  "Libre Barcode", // many semi repeats
  "Zen", // many non english repeats
  "Ponnala", // Unsure why but this one does not exist on google fonts
  "Tuffy", // Unsure why but this one does not exist on google fonts
];

// Many fonts have variations with these endings, essentially duplicates
const RESTRICTED_ENDING_KEYWORDS = ["SC", "Condensed"];

const ONE_OF_EACH_REPEATS = [
  "Playwrite US Modern",
  "IBM Plex Sans",
  "Baloo 2",
  "Noto Sans",
  "Noto Serif",
  "Big Shoulders Display",
  "Fira Sans",
  "Kaisei Opti",
  "Lexend",
  "Zen Loop",
  "Zen Dots",
  "IM Fell English",
  "Hind",
  "Bungee",
  "Libre Barcode 39 Text",
  "Encode Sans"
];
// const familiesFile = fs.readFileSync("families.csv", "utf-8");
const response = await fetch("https://raw.githubusercontent.com/google/fonts/main/tags/all/families.csv");
const responseText = await response.text();

const rows = responseText.split("\n");

// remove header row
rows.shift();

const fonts = rows.map((column) => column.split(",")[0])
  .filter((font) => !RESTRICTED_STARTING_KEYWORDS.some((keyword) => font.startsWith(keyword))
    && !RESTRICTED_ENDING_KEYWORDS.some((keyword) => font.endsWith(keyword))
    && font.length > 0); // there's an empty one in there

// add one of each of the repeats
fonts.push(...ONE_OF_EACH_REPEATS);

fs.writeFileSync("assets/fonts.json", JSON.stringify({ "fonts": Array.from(new Set(fonts).values()) }));
