import { useStorage } from "@vueuse/core";

const WORD_GROUPS = {
  pangrams: [
    "The quick brown fox jumps over the lazy dog.",
    "Sphinx of black quartz, judge my vow.",
    "How quickly daft jumping zebras vex!",
    "The five boxing wizards jump quickly.",
    "Pack my box with five dozen liquor jugs."
  ],
  vines: [
    "Only a spoonful",
    "Watch your profanity",
    "Look at all those chickens",
    "Road work ahead? I sure hope it does",
    "Stop! I could have dropped my croissant",
    "And they were roommates",
    "It's Wednesday my dudes",
    "FRE SH A VOCA DO",
    "That was legitness",
    "Gua Camole, Gua gua Camole"
  ],
  dutch: [
    "Heeft u een menu in het Engels?",
    "Ik ben vegetariër",
    "Kan ik met creditcard betalen?",
    "Kunt u me helpen?",
    "Hoe ver is het?",
    "Ik heb hulp nodig ",
    "Hoe gaat het?"
  ]
};

const DEFAULTS = {
  numberOfAnswerOptions: 2,
  exampleTexts: WORD_GROUPS["pangrams"],
  typingEffects: false,
  includeAuxiliaryKeywords: true,
};

export const useOptionsStore = defineStore("options", {
  state: () => ({
    numberOfAnswerOptions: useStorage("options/numberOfAnswerOptions", DEFAULTS["numberOfAnswerOptions"]),
    exampleTexts: useStorage("options/exampleTexts", DEFAULTS["exampleTexts"]),
    typingEffect: useStorage("options/typingEffect", DEFAULTS["typingEffects"]),
    includeAuxiliaryKeywords: useStorage("options/includeAuxiliaryKeywords", DEFAULTS["includeAuxiliaryKeywords"])
  }),
  actions: {
    resetExampleTexts() {
      this.$state.exampleTexts = DEFAULTS["exampleTexts"];
    },
    resetNumberOfAnswerOptions() {
      this.$state.numberOfAnswerOptions = DEFAULTS["numberOfAnswerOptions"];
    },
    toggleTypingEffect() {
      this.$state.typingEffect = this.$state.typingEffect ? false : true;
    },
    toggleIncludeAuxiliaryKeywords() {
      this.$state.includeAuxiliaryKeywords = this.$state.includeAuxiliaryKeywords ? false : true;
    },
  },

});
