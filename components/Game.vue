<script lang="js">

import fontNames from "~/assets/fonts.json";
import { sleep, shuffleArray, fontNameToURL, randomValueFromArray, importFont } from "../helpers.js";
import { useOptionsStore } from "../helpers/stores/options.js";
const fonts = fontNames["fonts"];

// Ways to make things harder
// remove "sans", "mono" from answers
//   bear in mind there's fonts named like Sansita
// speedier answers give more points
// show just one letter

// maybe have a bookmark feature for cool fonts

// Game Modes:
// Answer 20 questions see how many you got right
// Answer for 20 seconds see how many you got right

const POSITIVE_REINFORCEMENTS = [
  "Nice!",
  // "Splendid!",
  // "Wonderful"
];

const NEGATIVE_REINFORCEMENTS = [
  // "Epic Fail!",
  // "Terrible!",
  // "Fail!",
  "Wrong!"
];

export default {
  props: {
  },

  data() {
    return {
      options: useOptionsStore(),
      fonts: fonts,
      pangram: "",
      selectedFonts: [],
      feedback: "",
      answerFontName: "",
      answerFontURL: "",
      score: 0,
      totalAnswered: 0
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
      this.totalAnswered += 1;
      this.initNewQuestion();
    },

    async initNewQuestion() {
      const randomFonts = new Array(this.options.numberOfAnswerOptions).fill("").map(() => randomValueFromArray(fonts));
      this.answerFontName = randomFonts[0];
      this.answerFontURL = fontNameToURL(this.answerFontName);
      importFont(this.answerFontURL);

      // One way I found for the font to be loaded is by applying it to an element first
      document.querySelector("#invisibleFontLoader").style.fontFamily = this.answerFontName;
      // Then we still need to delay, this might be different with different connection speeds
      await sleep(500);

      this.pangramElement.style.fontFamily = this.answerFontName;

      this.selectedFonts = shuffleArray(randomFonts);
      this.pangram = randomValueFromArray(this.options.exampleTexts);

      await sleep(1000);
      this.feedback = "";
    }
  }
};

</script>

<template>
  <main>
    <div
      id="invisibleFontLoader"
      aria-visibility="hidden"
    >
      &nbsp;
    </div>
    <div id="game">
      <div id="pangram">
        <h1> {{ pangram }} </h1>
      </div>
      <div id="answerButtons">
        <Button
          v-for="font in selectedFonts"
          :key="font"
          @click="checkAnswer"
        >
          {{ font }}
        </Button>
      </div>
      <h2 class="mt-5">
        Score: {{ score }} / {{ totalAnswered }}
      </h2>
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
  font-size:3rem;
  border: 2px solid hsl(var(--border));
  border-radius: var(--radius);
  width:fit-content;
  padding:2rem;
  text-align: center;
  margin:1rem;
  justify-self: center;
}

#answerButtons{
  display:grid;
  grid-auto-flow: column;
  gap: 2rem;
  justify-content: center;
  & button {
    font-size: 1.3rem;
  }
}

#game{
  padding:2rem;
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  justify-items: center;
  justify-content: center;
  align-self:center;
}
</style>
