export default class Font {
  constructor(name, options = {}) {
    this.name = name;
    this.displayName = name;
    this.nameNoSpaces = name.replaceAll(" ", "_");
    this.options = options;
    this.buildDisplayName();
    this.externalShowcaseURL = fontNameToExternalShowcaseURL(name);
    this.stylesheetURL = fontNameToURL(name);
  }

  buildDisplayName() {
    this.displayName = this.name;
    if (Object.keys(this.options).length === 0) return;
    if (!this.options.includeAuxiliaryKeywords) {
      this.displayName = this.displayName.replaceAll(" Sans Serif", "");
      this.displayName = this.displayName.replaceAll(" Sans", "");
      this.displayName = this.displayName.replaceAll(" Serif", "");
      this.displayName = this.displayName.replaceAll(" Mono", "");
    }
  }
}
