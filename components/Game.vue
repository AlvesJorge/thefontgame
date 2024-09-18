<script setup>
import Typed from "typed.js";
import Font from "../models/Font";

const TIMED_DEFAULT_TIME = 30000;
const ROUNDS_DEFAULT_ROUNDS = 10;
const DEFAULT_GAME_MODE = () => new RoundsGame(options, ROUNDS_DEFAULT_ROUNDS);

const options = ref(useOptionsStore());
const fontHistory = ref(useFontHistoryStore());
const fontShowcase = ref(new FontShowcase(useTemplateRef("fontShowcaseElement"), options.value.exampleTexts));
const gameMode = ref("rounds");
const showGameReview = ref(false);
const game = ref(DEFAULT_GAME_MODE());
let typewriterObject = {};

// A player changing game options should reset their score and start
// a new round. However the first time a page loads
// the options "change", this causes it to start a new round twice
let ignoreOptionsChangeFlag = true;

watch(options, () => {
  if (ignoreOptionsChangeFlag) {
    ignoreOptionsChangeFlag = false;
  } else {
    newRound(500);
  }
}, { deep: true });

function startTimerGame() {
  newRound(500);
  sleep(1500);
  game.value.start();
  showGameReview.value = false;
}

function timedGameFinishedCallback() {
  showGameReview.value = true;
}

function updateGameMode(newGameModeName) {
  if (typewriterObject instanceof Typed) typewriterObject?.destroy();

  if (gameMode.value === "timed") {
    game.value.finished(true);
  }

  if (newGameModeName === "timed") {
    game.value = new TimedGame(options, TIMED_DEFAULT_TIME, timedGameFinishedCallback);
    fontShowcase.value.clearText();
  }
  if (newGameModeName === "rounds") {
    game.value = new RoundsGame(options, ROUNDS_DEFAULT_ROUNDS);
    newRound(500);
  }
  if (newGameModeName === "infinite") {
    game.value = new BaseGame(options);
    newRound(500);
  }
  gameMode.value = newGameModeName;
}

/**
 * * @param {Font} font
 */
async function checkAnswer(font) {
  let delay = 1500;
  const buttonElementWrapper = document.querySelector(`#${font.nameNoSpaces}`);
  if (font.name === game.value.answer.fontName) {
    game.value.increaseScore();
    // this is what is causing them to sometimes stay green or red
    buttonElementWrapper.classList.add("correct");
  } else {
    document.querySelector(`#${game.value.answer.fontName.replaceAll(" ", "_")}`).classList.add("correct");
    buttonElementWrapper.classList.add("wrong");
    game.value.updateWrongAnswers(game.value.answer.fontName);
  }
  game.value.increaseTotalAnswered();
  if (game.value.name === "rounds" && game.value.hasFinished()) {
    showGameReview.value = true;
    return;
  }
  if (game.value.name === "timed") {
    delay = 750;
  }
  newRound(delay);
}

async function newRound(delay = 1500) {
  game.value.newRound();
  importFont(game.value.answer.stylesheetURL);
  await fontShowcase.value.newRound(game, game.value.answer, delay);

  if (options.value.typingEffect) {
    writeWithTypewriter();
  }
  fontHistory.value.addToHistory(game.value.answer.fontName);
  return Promise.resolve();
}

function writeWithTypewriter() {
  // Destroy it so there's no chance there are two typewriter effects
  // happening at the same time
  if (typewriterObject instanceof Typed) typewriterObject?.destroy();
  typewriterObject = new Typed("#fontShowcase", {
    strings: [fontShowcase.value.text],
    typeSpeed: 30,
    showCursor: false,
  });
}

onMounted(() => {
  newRound(500);
});
</script>

<template>
  <main>
    <div id="game">
      <ToggleGroup
        id="gameModeToggleGroup"
        type="single"
        :model-value="gameMode"
        @update:model-value="updateGameMode"
      >
        <ToggleGroupItem value="infinite">
          Zen
        </ToggleGroupItem>
        <ToggleGroupItem value="rounds">
          Rounds
        </ToggleGroupItem>
        <ToggleGroupItem value="timed">
          Timed
        </ToggleGroupItem>
      </ToggleGroup>

      <div
        v-if="game.name === 'rounds'"
        class="fontShowcaseTop"
      >
        <h2 id="score">
          {{ game.totalAnswered }} / {{ game.totalToAnswer }}
        </h2>

        <Button
          class="p-3"
          @click="()=> updateGameMode('rounds')"
        >
          <span v-if="game.hasFinished()">New Game</span>

          <span v-else>
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </Button>
      </div>

      <h2
        v-if="game.name === 'timed'"
        id="score"
      >
        <span v-if="game.started"><b>Answered </b> {{ game.score }} correctly</span>
        <span v-else>Press start to begin the timer</span>
        <br>
        <div id="timer">
          <span> {{ game.timer }} / {{ game.time / 1000 }}</span>

          <svg
            width="30"
            height="30"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L11.858 2.25806C12.1021 2.01398 12.4978 2.01398 12.7419 2.25806C12.986 2.50214 12.986 2.89786 12.7419 3.14194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13362 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.99998 4.5C7.99998 4.22386 7.77612 4 7.49998 4C7.22383 4 6.99998 4.22386 6.99998 4.5V9.5C6.99998 9.77614 7.22383 10 7.49998 10C7.77612 10 7.99998 9.77614 7.99998 9.5V4.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            />
          </svg>

          <Button
            class="p-3"
            @click="()=> startTimerGame()"
          >
            <span v-if="!game.started || game.hasFinished()">Start</span>
            <span v-else>
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </div>
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
          :id="font.nameNoSpaces"
          :key="font.nameNoSpaces"
          @click="checkAnswer(font)"
        >
          {{ font.displayName }}
        </JCButton>
      </div>
    </div>

    <Dialog v-model:open="showGameReview">
      <GameFinishDialog :game="game" />
    </Dialog>
  </main>
</template>

<style scoped>
#score {
  font-size: 2rem;
}

#gameModeToggleGroup{
  gap:1rem;
}

#gameModeToggleGroup button{
  font-size:1.5rem;
  padding:1.5rem 1rem;
}

#fontShowcase {
  font-size: 3rem;
  border-radius: var(--radius);
  background-color: hsl(var(--card));
  width: 90%;
  min-height: 14rem;
  padding: 2rem;
  text-align: center;
  justify-self: center;
  align-content: center;
}

.fontShowcaseTop {
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  place-content: center;
  place-items: center;
}

.light #fontShowcase {
  box-shadow: 0 0 12px #989898;
  border: 2px solid hsl(var(--primary));
}

#timer {
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  place-items: center;
  gap: 0.5rem;
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
  gap: 2rem;
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
