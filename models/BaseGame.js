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
  /**
   * @param {ReturnType<useOptionsStore>} options
   */
  constructor(options) {
    this.fonts = fontNames["fonts"];
    this.options = options;
    this.totalAnswered = 0;
    this.score = 0;
    this.ui = {};
    this.updateUIAnswers();
    this.name = "infinite";
    this.answeredWrongFonts = [];
  }

  increaseTotalAnswered() {
    this.totalAnswered += 1;
  }

  increaseScore() {
    this.score += 1;
  }

  updateWrongAnswers() {
    this.answeredWrongFonts.push(new Font(this.answer.fontName, this.options));
  }

  // Showing the new answer options should only happen after
  // the player had time to see the feedback on their last answer
  updateUIAnswers() {
    this.ui.selectedFonts = this.selectedFonts;
  }

  newRound() {
    const randomFonts = new Array(this.options.numberOfAnswerOptions).fill("").map(() => randomValueFromArray(this.fonts));
    this.answer = new Answer(randomFonts[0]);
    this.selectedFonts = shuffleArray(randomFonts).map((fontName) => new Font(fontName, this.options));
  }
}
