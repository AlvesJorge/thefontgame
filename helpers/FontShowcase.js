
export class FontShowcase {
  /**
   * Responsible for showcasing the font in a element on the page
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
    this.preloadFont(answer.name);
    await sleep(delay);
    this.clearText();
    game.value.updateUIAnswers();
    this.changeFontFamily(answer.name);
    this.updateText();
    return Promise.resolve();
  }

  createInvisibleElement() {
    // It seems fonts only truly load once they are in a element in the DOM
    // this causes a FOUC. Using a invisible element we can load the font
    // before displaying it in the font showcase
    const div = document.createElement("div");
    div.innerHTML = " <div id='invisibleFontLoader' aria-visibility='hidden'> &nbsp; </div> ";
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
  async changeFontFamily(name) {
    this.element.style.fontFamily = name;
  }

  clearText() {
    this.text = "";
  }

  updateText() {
    this.text = randomValueFromArray(this.texts);
  }
}
