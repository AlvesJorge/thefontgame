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
  }
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
  <main>
    <IndexNav />
    <div id="mainHeader">
      <h1>
        The Font Game
      </h1>
    </div>
    <Game />
  </main>
</template>
<style scoped>
main{
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
  height: 100%;
}
#mainHeader{
  font-size:2rem;
  font-weight: 800;
  height:min-content;
  text-align: center;
  display: grid;
  place-items: center;
}
</style>
