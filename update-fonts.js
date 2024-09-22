import fs from "node:fs";
import axios from "axios";

const RESTRICTED_STARTING_KEYWORDS = [
  "Playwrite", // many repeats
  "IBM Plex Sans", // many repeats
  "Baloo", // many repeats
  "Noto Sans", // many repeats
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
  "Edu", // too many semi repeats, bug in parsing metadata in one of them too
  "Post No Bills Jaffna", // doesn't exist anymore
  "Kumar One Outline", // doesn't exist anymore
  "Yarndings" // not latin text
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

const uniqueFontNames = Array.from(new Set(fonts).values());

const metadataBaseURL = "https://raw.githubusercontent.com/google/fonts/main";
// different fonts are under different licenses, which change the url formation for the metadata option
const licenses = ["ofl", "apache", "ufl"];
// Problem: Some fonts are primarily made for language systems other than latin, these often have
// latin fallbacks as generic sans fonts, others none at all
// either case we don't want to display these in the game as they can be misleading
// Solution: This filtering is done by checking the metadata file for the font;
// A  lack of a primary script indicates it's a latin writing system font
const latinFonts = await Promise.all(uniqueFontNames.map(async (fontName) => {
  const fontNameInURL = fontName.toLowerCase().replaceAll(" ", "");
  let response;
  for (const license of licenses) {
  // axios is required because sending to many requests seems to break node fetch / undici, due to ipv6 dns resolution issues
    response = await axios.get(`${metadataBaseURL}/${license}/${fontNameInURL}/METADATA.pb`, { validateStatus: false });
    if (response.status !== 404) break;
  }
  const lines = response.data.split("\n");
  const primaryScriptRow = lines.find((row) => row.startsWith("primary_script"));
  return primaryScriptRow === undefined ? [fontName] : [];
}));

fs.writeFileSync("assets/fonts.json", JSON.stringify({ "fonts": latinFonts.flat() }));
