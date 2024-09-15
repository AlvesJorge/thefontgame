import fontNames from "~/assets/fonts.json";
export class Answer {
  /**
   * @param {String} fontName
   * @param {String} stylesheetURL
   */
  constructor(fontName) {
    this.fontName = fontName;
    this.stylesheetURL = fontNameToURL(fontName);
  }
}
export class BaseGame {
  constructor(options) {
    this.fonts = fontNames["fonts"];
    this.options = options;
    this.totalAnswered = 0;
    this.score = 0;
    this.ui = {};
    this.updateUI();
    this.name = "infinite";
  }

  increaseTotalAnswered() {
    this.totalAnswered += 1;
  }

  increaseScore() {
    this.score += 1;
  }

  finished() {
    return false;
  }

  updateUI() {
    this.ui.score = this.score;
    this.ui.totalAnswered = this.totalAnswered;
    this.ui.selectedFonts = this.selectedFonts;
  }

  newRound() {
    const randomFonts = new Array(this.options.numberOfAnswerOptions).fill("").map(() => randomValueFromArray(this.fonts));
    this.answer = new Answer(randomFonts[0]);
    this.selectedFonts = shuffleArray(randomFonts);
  }
}
