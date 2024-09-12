<script>
import { useFontHistoryStore } from "../helpers/stores/fontHistory.js";
import { importFont } from "../helpers.js";
export default {
  data() {
    return {
      fontHistory: useFontHistoryStore(),
      fontNames: []
    };
  },
  mounted() {
    console.log(this.fontHistory.history[0]);
    const fontURLs = Array.from(new Set(this.fontHistory.history.map((font) => font[1])));
    fontURLs.forEach((url) => importFont(url));
    this.fontNames = Array.from(new Set(this.fontHistory.history.toReversed().map((font) => font[0])));
  },
};
</script>
<template>
  <MainNav />

  <h1
    v-for="font in fontNames"
    :key="font"
    :style="`font-family: ${font}`"
  >
    {{ font }}
  </h1>
</template>
<style>
h1{
    font-size:4rem;
}

</style>
