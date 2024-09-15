<script setup>
import Typed from "typed.js";
import { ref, watch, useTemplateRef } from "vue";

// Ways to make things harder
// remove "sans", "mono" from answers
//   bear in mind there's fonts named like Sansita
// speedier answers give more points
// show just one letter

// maybe have a bookmark feature for cool fonts

// Game Modes:
// Answer 20 questions see how many you got right
// Answer for 20 seconds see how many you got right

// modes:
// infinite: keep going forever and show score / total
// timed: 30 seconds how many can you get right. show score / total / time
// count: 30 fonts, show score / 30

const options = ref(useOptionsStore());
const fontHistory = ref(useFontHistoryStore());
const fontShowcase = ref(new FontShowcase(useTemplateRef("fontShowcaseElement"), options.value.exampleTexts));
const game = ref(new BaseGameMode(options));
let typewriterObject = {};

watch(options, () => initNewQuestion(500), { deep: true });

async function checkAnswer(event) {
  if (event.target.textContent === game.value.answer.fontName) {
    game.value.increaseScore();
    // this is what is causing them to sometimes stay green or red
    event.target.parentElement.classList.add("correct");
  } else {
    document.querySelector(`#${game.value.answer.fontName.replaceAll(" ", "_")}`).classList.add("correct");
    event.target.parentElement.classList.add("wrong");
  }
  game.value.increaseTotalAnswered();
  initNewQuestion();
}

async function initNewQuestion(delay = 1500) {
  game.value.newRound();
  importFont(game.value.answer.stylesheetURL);
  await fontShowcase.value.newRound(game, game.value.answer, delay);

  if (options.value.typingEffect) {
    // Destroy it so there's no chance there are two typewriter effects
    // happening at the same time
    if (typewriterObject instanceof Typed) typewriterObject?.destroy();
    typewriterObject = new Typed("#fontShowcase", {
      strings: [fontShowcase.value.text],
      typeSpeed: 30,
      showCursor: false,
    });
  }
  fontHistory.value.addToHistory(game.value.answer.fontName, game.value.answer.stylesheetURL);
}
</script>

<template>
  <main>
    <div id="game">
      <h2 id="score">
        <b>Score</b> {{ game.ui.score }} / {{ game.ui.totalAnswered }}
      </h2>
      <div
        id="fontShowcase"
        ref="fontShowcaseElement"
      >
        <h1 v-if="() => !options.typingEffect">
          {{ fontShowcase.text }}
        </h1>
      </div>
      <div id="answerButtons">
        <JCButton
          v-for="font in game.ui.selectedFonts"
          :id="font.replaceAll(' ', '_')"
          :key="font"
          @click="checkAnswer"
        >
          {{ font }}
        </JCButton>
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped>
#score {
  font-size: 2rem;
}

#fontShowcase {
  font-size: 3rem;
  border-radius: var(--radius);
  background-color: hsl(var(--card));
  width: 90%;
  min-height: 14rem;
  padding: 2rem;
  text-align: center;
  margin: 1rem;
  justify-self: center;
  align-content: center;
}

.light #fontShowcase {
  box-shadow: 0 0 12px #989898;
  border: 2px solid hsl(var(--primary));
}

#answerButtons {
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-flow: row;
  gap: 2rem;
  padding-top: 0.5rem;
  justify-content: center;
  align-items: center;

  & button {
    font-size: 8rem;
  }
}

#game {
  padding: 2rem;
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  justify-items: center;
  justify-content: center;
  align-self: center;
  height: 100%;
}

@media only screen and (max-width: 800px) {
  #game {
    padding: 0 0.5rem;
    gap: 0.5rem;
  }

  #score {
    font-size: 1.5rem;
  }

  #fontShowcase {
    font-size: 2.5rem;
    padding: 1rem;
    min-height: 16rem;
    width: 95%;
    min-width: unset;
    margin: 0.5rem;
  }

  #answerButtons {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    gap: 1rem;
  }
}
</style>
