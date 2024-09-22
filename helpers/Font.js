// Keywords that  can help identify a font. The space before the word is important
const AUXILIARY_KEYWORDS = [" Sans", " Serif", " Mono", " Sans Serif", " Script", " Slab", " SC", " Gothic"];

export default class Font {
  /**
   * Responsible for creating needed font URLs and different font identifiers
   * @param {String} name
   * @param {ReturnType<useOptionsStore> | Object} options
   */
  constructor(name, options = {}) {
    this.name = name;
    this.nameNoSpaces = name.replaceAll(" ", "_");
    this.options = options;
    this.displayName = this.#buildDisplayName();
    this.externalShowcaseURL = this.#buildExternalShowcaseURL();
    this.stylesheetURL = this.#buildStylesheetURL();
  }

  #buildDisplayName() {
    if (Object.keys(this.options).length === 0) return this.name;
    if (!this.options.includeAuxiliaryKeywords) {
      const regex = new RegExp(AUXILIARY_KEYWORDS.join("|"), "gi");
      return this.name.replaceAll(regex, "");
    }
    return this.name;
  }

  /**
   * Returns URL of the importable CSS stylesheet
   * @returns {String}
   */
  #buildStylesheetURL() {
    return `https://fonts.googleapis.com/css2?family=${this.name}`;
  }

  /**
   * Returns URL of the font showcase in google fonts
   * @returns {String}
   */
  #buildExternalShowcaseURL() {
    return `https://fonts.google.com/specimen/${this.name}`;
  }
}
