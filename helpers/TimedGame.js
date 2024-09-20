export default class TimedGame extends BaseGame {
  /**
   * Game that ends when a set amount of time has passed
   * @param {ReturnType<useOptionsStore>} options
   * @param {Number} time
   * @param {Function} finishedCallback
   */
  constructor(options, time, finishedCallback) {
    super(options);
    this.time = time;
    this.timer = 0;
    this.started = false;
    this.name = "timed";
    this.finishedCallback = finishedCallback;
  }

  start() {
    this.started = true;
    this.startTimer();
  }

  startTimer() {
    this.clock = setInterval(() => {
      this.timer += 1;
      if (this.timer == this.time) this.finished();
    }, 1000);
  }

  increaseScore() {
    super.increaseScore();
    this.timer += 1;
  }

  updateWrongAnswers() {
    super.updateWrongAnswers();
    this.timer += 1;
  }

  /**
   * @param {Boolean} interrupted
   */
  finished(interrupted = false) {
    clearInterval(this.clock);
    this.timer = this.time;
    this.started = false;
    if (!interrupted) this.finishedCallback.call();
  }

  /**
   * @returns {Boolean}
   */
  hasFinished() {
    return this.timer >= this.time;
  }
}
