export class FontShowcase {
  /**
   * @param {HTMLElement} element
   * @param {String[]} texts
   */
  constructor(element, texts) {
    this.element = element;
    this.texts = texts;
  }

  /**
   * @param {BaseGame|TimedGame|RoundsGame} game
   * @param {Font} answer
   * @param {Number} delay
   * @returns {Promise}
   */
  async newRound(game, answer, delay) {
    this.preloadFont(answer.fontName);
    await sleep(delay);
    this.clearText();
    game.value.updateUIAnswers();
    this.updateFontStyle(answer.fontName);
    this.updateText();
    return Promise.resolve();
  }

  createInvisibleElement() {
    const div = document.createElement("div");
    div.innerHTML = " <div id='invisibleFontLoader' aria-visibility='hidden' style='height:0; width:0' > &nbsp; </div> ";
    document.body.append(div);
    return div;
  }

  /**
   * @param {String} name
   */
  async preloadFont(name) {
    // Then we still need to delay, this might be different with different connection speeds
    // One way I found for the font to be loaded is by applying it to an element first
    this.invisibleElement ??= this.createInvisibleElement();
    this.invisibleElement.style.fontFamily = name;
  }

  /**
   * @param {String} name
   */
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
