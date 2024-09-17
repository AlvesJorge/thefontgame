export default class Font {
  constructor(name) {
    this.name = name;
    this.externalShowcaseURL = fontNameToExternalShowcaseURL(name);
    this.stylesheetURL = fontNameToURL(name);
  }
}
