export default class FiniteGame extends BaseGame {
  constructor(options, totalToAnswer) {
    super(options);
    this.totalToAnswer = totalToAnswer;
    this.name = "finite";
  }

  finished() {
    return this.totalAnswered === this.totalToAnswer;
  }
}
