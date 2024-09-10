/**
 * @param {String} fontName
 * @returns {String}
 */
export function fontNameToURL(fontName) {
  return `https://fonts.googleapis.com/css2?family=${fontName}&display=block`;
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
 * @param {Array} array
 * @returns
 */
export function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 *
 * @param {Array} array
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
