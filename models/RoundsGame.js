export default class RoundsGame extends BaseGame {
  constructor(options, totalToAnswer) {
    super(options);
    this.totalToAnswer = totalToAnswer;
    this.name = "rounds";
  }

  hasFinished() {
    return this.totalAnswered === this.totalToAnswer;
  }
}
