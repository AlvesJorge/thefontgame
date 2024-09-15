/**
 * Returns URL of the importable CSS stylesheet
 * @param {String} fontName
 * @returns {String}
 */
export function fontNameToURL(fontName) {
  return `https://fonts.googleapis.com/css2?family=${fontName}`;
}

/**
 * @param {String} fontURL
 * @returns {Promise}
 */
export function importFont(fontURL) {
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", fontURL);
  document.head.appendChild(link);
}

/**
 * Returns URL of the font showcase in google fonts
 * @param {String} fontName
 * @returns {String}
 */
export function fontNameToExternalShowcaseURL(fontName) {
  return `https://fonts.google.com/specimen/${fontName}`;
}

/**
 * @param {Array} array
 * @returns
 */
export function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {Array} array
 * @returns {Array}
 */
export function shuffleArray(array) {
  let j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

/**
 * @param {Number} delay
 * @returns {Promise}
 */
export function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
