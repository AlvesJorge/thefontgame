<script setup>
const FEEDBACK_MESSAGES = {
  perfect: ["You must be cheating!"],
  great: [
    "You're quite the pro.",
    "You've seen more than handful of fonts back in your day and it shows.",
    "Is this real life or just fontasy?",
    "Fontastic!",
    "You tried dipping your toes in the fontain of type faces, fell in, and returned an expert."
  ],
  normal: [
    "Cool!",
    "Nice!",
    "Could be worse, could be better.",
    "You are amongst the top people in the world (probably not)!"],
  bad: [""],
  reallyBad: [
    "The odds are in your favor to get at least a few correctly, but that was not enough to stop you from failing them all.",
    "Suspiciously bad..."
  ]
};

function feedbackMeritCalculator(game) {
  if (game.name === "timed") return `You got ${game.score} correct out of ${game.totalAnswered} total answered in ${game.time / 1000} seconds!`;
  if (game.totalAnswered > 9) {
    if (game.answeredWrongFonts.length === 0)
      return `${randomValueFromArray(FEEDBACK_MESSAGES.perfect)} You got all ${game.totalAnswered} fonts correct!`;
    if (game.answeredWrongFonts.length === game.totalAnswered)
      return `${randomValueFromArray(FEEDBACK_MESSAGES.reallyBad)} You got it all wrong!`;
  }

  const accuracyPercentage = game.answeredWrongFonts.length / game.totalAnswered;
  if (accuracyPercentage >= 0.7) {
    return `${randomValueFromArray(FEEDBACK_MESSAGES.great)} You got ${game.score} correct out of ${game.totalAnswered} total answered!`;
  }
  if (accuracyPercentage >= 0.4) {
    return `${randomValueFromArray(FEEDBACK_MESSAGES.normal)} You got ${game.score} correct out of ${game.totalAnswered} total answered!`;
  }
  return `You got ${game.score} correct out of ${game.totalAnswered} total answered!`;
}

const props = defineProps({
  game: [BaseGame, RoundsGame, TimedGame]
});

</script>

<template>
  <DialogContent
    class="text-xl dialogContent"
  >
    <DialogHeader id="dialogHeader">
      <DialogTitle class="text-3xl">
        Finished!
      </DialogTitle>
    </DialogHeader>
    {{ feedbackMeritCalculator(props.game) }}
    <br>
    Rounds Answered: {{ props.game.totalAnswered }}
    <br>
    Options per round: {{ props.game.options.numberOfAnswerOptions }}
    <br>
    Auxiliary keywords in font names turned {{ props.game.options.includeAuxiliaryKeywords }}
    <br>
    <div v-if="props.game.answeredWrongFonts.length > 0">
      <h2 id="tableTitle">
        Here are the ones you got wrong:
      </h2>
      <FontsTable :fonts="props.game.answeredWrongFonts" />
    </div>
  </DialogContent>
</template>

<style>
.dialogContent{
  min-width: 80vw;
}
#tableTitle{
  margin:1rem 0;
}

</style>
