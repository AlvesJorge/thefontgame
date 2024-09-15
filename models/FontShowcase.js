import { randomValueFromArray, sleep } from "../helpers/helpers";
export class FontShowcase {
  /**
     * @param {HTMLElement} element
     * @param {String[]} texts
     */
  constructor(element, texts) {
    this.element = element;
    this.texts = texts;
  }

  createInvisibleElement() {
    const div = document.createElement("div");
    div.innerHTML = " <div id='invisibleFontLoader' aria-visibility='hidden' style='height:0; width:0' > &nbsp; </div> ";
    document.body.append(div);
    return div;
  }

  async preloadFont(name) {
    // Then we still need to delay, this might be different with different connection speeds
    // One way I found for the font to be loaded is by applying it to an element first
    this.invisibleElement ??= this.createInvisibleElement();
    this.invisibleElement.style.fontFamily = name;
  }

  async updateFontStyle(name) {
    this.element.style.fontFamily = name;
  }

  clearText() {
    this.text = "";
  }

  updateText() {
    this.text = randomValueFromArray(this.texts);
  }
}
