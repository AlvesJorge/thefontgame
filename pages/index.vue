<script setup>
onMounted(() => {
  // goat counter is a open source alternative to google analytics
  const script = document.createElement("script");
  script.setAttribute("data-goatcounter", "https://thefontgame.goatcounter.com/count");
  script.async = true;
  script.src = "//gc.zgo.at/count.js";
  document.body.appendChild(script);
  window.goatcounter = { no_onload: true };

  window.addEventListener("hashchange", () => {
    window.goatcounter.count({ path: location.pathname + location.search + location.hash });
  });
});
</script>
<template>
  <main class="pattern-background">
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

      <meta
        name="description"
        content="Can you guess the name of that font? Look at the font demo, and pick from an array of options. Guess, learn and discover new Fonts!"
      >

      <title> The Font Game </title>
    </Head>
    <MainNav />
    <Game />
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr;
  height: 100%;
}

.dark .pattern-background {
  background-repeat: repeat;
  background-size: 300px;

  animation: moveBackground 60s linear infinite;
  background-image: url("/assets/background-dark.svg");
}

@keyframes moveBackground {
  from {
    background-position: bottom
  }

  to {
    background-position: top
  }
}
</style>
