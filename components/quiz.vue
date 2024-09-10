
<script lang="js">
import fontNames from "~/assets/fonts.json";
import { sleep, shuffleArray, fontNameToURL, randomValueFromArray, importFont } from "../helpers.js";
const fonts = fontNames["fonts"];

// Ways to make things harder
// remove "sans", "mono" from answers
//   bear in mind there's fonts named like Sansita
// give more answers options
// speedier answers give more points
// show just one letter

// maybe have a bookmark feature for cool fonts

// Game Modes:
// Answer 20 questions see how many you got right
// Answer for 20 seconds see how many you got right

const PANGRAMS = [
  "Blowzy night-frumps vex'd Jack Q.",
  "Mr. Jock, TV quiz PhD, bags few lynx.",
  "The quick brown fox jumps over the lazy dog.",
  "Sphinx of black quartz, judge my vow.",
  "How quickly daft jumping zebras vex!",
  "The five boxing wizards jump quickly.",
  "Jackdaws love my big sphinx of quartz.",
  "Pack my box with five dozen liquor jugs."
];

const POSITIVE_REINFORCEMENTS = [
  "Nice!",
  "Splendid!",
  "Wonderful"
];

const NEGATIVE_REINFORCEMENTS = [
  "Epic Fail!",
  "Terrible!",
  "Fail!",
];

export default {
  data() {
    return {
      fonts: fonts,
      pangram: "",
      selectedFonts: [],
      feedback: "",
      answerFontName: "",
      answerFontURL: "",
      numberOfOptions: 3,
      score: 0
    };
  },

  mounted() {
    this.pangramElement = document.querySelector("#pangram");
    this.initNewQuestion();
  },

  methods: {
    async checkAnswer(event) {
      if (event.target.textContent === this.answerFontName) {
        this.feedback = `${randomValueFromArray(POSITIVE_REINFORCEMENTS)}`;
        this.score += 1;
      } else {
        this.feedback = `${randomValueFromArray(NEGATIVE_REINFORCEMENTS)} \n The answer was: ${this.answerFontName}`;
      }
      this.initNewQuestion();
    },

    async initNewQuestion() {
      const randomFonts = new Array(this.numberOfOptions).fill("").map(() => randomValueFromArray(fonts));
      this.answerFontName = randomFonts[0];
      this.answerFontURL = fontNameToURL(this.answerFontName);
      importFont(this.answerFontURL);

      // One way I found for the font to be loaded is by applying it to an element first
      document.querySelector("#invisibleFontLoader").style.fontFamily = this.answerFontName;
      // Then we still need to delay, this might be different with different connection speeds
      await sleep(500);

      this.pangramElement.style.fontFamily = this.answerFontName;

      this.selectedFonts = shuffleArray(randomFonts);
      this.pangram = randomValueFromArray(PANGRAMS);

      this.feedback = "";
    }
  }
};

</script>

<template>
  <main id="font">
    <div
      id="invisibleFontLoader"
      aria-visibility="hidden"
    >
      &nbsp;
    </div>
    <div>
      <div id="pangram">
        <h1> {{ pangram }} </h1>
      </div>
      <div id="answerButtons">
        <button
          v-for="font in selectedFonts"
          :key="font"
          @click="checkAnswer"
        >
          {{ font }}
        </button>
      </div>
      <h2>Score: {{ score }}</h2>
      <h3>{{ feedback }}</h3>
    </div>
  </main>
</template>

<style lang="css" scoped>
main {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#invisibleFontLoader{
  height:0;
  width:0;
}
#pangram{
  font-display: block;
  font-size:2rem;
  color: #0e0e0e
}

#answerButtons{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  gap:2rem;
}
button{
  font-size: 2rem;
  border:3px solid black;
  border-radius: 16px;
  cursor: pointer;
}
</style>
