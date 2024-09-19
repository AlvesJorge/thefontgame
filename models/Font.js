export default class Font {
  /**
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
      const auxiliaryKeywords = [" Sans", " Serif", " Mono", " Sans Serif"];
      const regex = new RegExp(auxiliaryKeywords.join("|"), "gi");

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
