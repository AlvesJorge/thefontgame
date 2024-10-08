import fontNames from "~/assets/fonts.json";

export class BaseGame {
  /**
   * Base Game which the other games derive from
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
    this.answeredWrongFonts.push(this.answer);
  }

  // Showing the new answer options should only happen after
  // the player had time to see the feedback on their last answer
  updateUIAnswers() {
    this.ui.selectedFonts = this.selectedFonts;
  }

  getNewFonts() {
    const randomFontNames = new Array(this.options.numberOfAnswerOptions).fill().map(() => randomValueFromArray(this.fonts));
    // on the off chance we get the same font twice, or even different fonts but same display name
    if (new Set(randomFontNames.map((fontName) => new Font(fontName, this.options).displayName)).size !== this.options.numberOfAnswerOptions) {
      return this.getNewFonts();
    }
    return randomFontNames;
  }

  newRound() {
    this.selectedFonts = this.getNewFonts().map((fontName) => new Font(fontName, this.options));
    this.answer = randomValueFromArray(this.selectedFonts);
  }
}
