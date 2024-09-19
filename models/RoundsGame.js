export default class RoundsGame extends BaseGame {
  /**
   * Game that ends when a set amount of questions were answered
   * @param {ReturnType<useOptionsStore>} options
   * @param {Number} totalToAnswer
   */
  constructor(options, totalToAnswer) {
    super(options);
    this.totalToAnswer = totalToAnswer;
    this.name = "rounds";
  }

  hasFinished() {
    return this.totalAnswered === this.totalToAnswer;
  }
}
