<script lang="js">
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

      <title> The Font Game </title>
    </Head>
    <MainNav />
    <Game />
  </main>
</template>
<style scoped>
main{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
  height: 100%;
}

.dark .pattern-background{
  background-repeat: repeat;
  background-size: 300px;

  animation: moveBackground 60s linear infinite;
  background-image: url("/assets/background-dark.svg");
}

@keyframes moveBackground {
  from {background-position: bottom}
  to {background-position: top}
}

</style>
