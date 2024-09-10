<script lang="js">
import { useOptionsStore } from "../helpers/stores/options";

export default {
  data() {
    return {
      options: useOptionsStore(),
      numberOfAnswerOptions: 3,
    };
  },
  methods: {
    updateNumberOfAnswerOptions(newValue) {
      this.numberOfAnswerOptions = newValue;
    }
  },
};

</script>
<template>
  <Head>
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
    >
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin="true"
    >
    <title> The Font Game </title>
  </Head>
  <Game
    :number-of-answer-options="numberOfAnswerOptions"
  />
  <OptionsSheet
    :number-of-answer-options="numberOfAnswerOptions"
    @update-number-of-answer-options="updateNumberOfAnswerOptions"
  />
</template>
