export default class TimedGame extends BaseGame {
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
    }, 1000);
    setTimeout(() => {
      this.finished();
    }, this.time);
  }

  finished(interrupted = false) {
    clearInterval(this.clock);
    this.timer = this.time;
    this.started = false;
    if (!interrupted) this.finishedCallback.call();
  }
}
