export default class TimedGame extends BaseGame {
  constructor(options, time, finishedCallback) {
    super(options);
    this.time = time;
    this.timer = 0;
    this.started = false;
    this.finished = false;
    this.name = "timed";
    this.finishedCallback = finishedCallback;
  }

  start() {
    this.started = true;
    this.startTimer();
  }

  startTimer() {
    const clock = setInterval(() => {
      this.timer += 1;
    }, 1000);
    setTimeout(() => {
      this.finished = true;
      this.finishedCallback();
      this.timer = this.time;
      clearInterval(clock);
    }, this.time);
  }

  finished() {
    return this.totalAnswered === this.totalToAnswer;
  }
}
