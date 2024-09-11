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
    exampleTexts: EXAMPLE_TEXTS,
    typingEffect: true
  }),
  actions: {
    resetExampleTexts() {
      this.$state.exampleTexts = EXAMPLE_TEXTS;
    },
    resetNumberOfAnswerOptions() {
      this.$state.numberOfAnswerOptions = 3;
    },
    toggleTypingEffect() {
      console.log(this.$state.typingEffect);
      this.$state.typingEffect = this.$state.typingEffect ? false : true;
      console.log(this.$state.typingEffect);
      return this.$state.typingEffect;
    },
  }

});
