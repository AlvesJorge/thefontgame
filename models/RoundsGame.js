export default class RoundsGame extends BaseGame {
  /**
   * Game that ends when a set amount of questions were answered
   * @param {ReturnType<useOptionsStore>} options
   * @param {Number} rounds
   */
  constructor(options, rounds) {
    super(options);
    this.rounds = rounds;
    this.name = "rounds";
  }

  hasFinished() {
    return this.totalAnswered === this.rounds;
  }
}
