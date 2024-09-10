import { defineStore } from "pinia";

const EXAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog.",
  "Sphinx of black quartz, judge my vow.",
  "How quickly daft jumping zebras vex!",
  "The five boxing wizards jump quickly.",
  "Pack my box with five dozen liquor jugs."
];
export const useOptionsStore = defineStore("options", {
  state: () => ({
    numberOfAnswerOptions: 3,
    exampleTexts: EXAMPLE_TEXTS
  }),
  actions: {
    resetExampleTexts() {
      this.$state.exampleTexts = EXAMPLE_TEXTS;
    },
    resetNumberOfAnswerOptions() {
      this.$state.numberOfAnswerOptions = 3;
    }
  }

});
