<script lang="js">
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
  <main class="dotted-background">
    <MainNav />
    <Game />
  </main>
</template>
<style scoped>
main {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
main{
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr;
  height: 100%;
}

.light .dotted-background{
  background-image: radial-gradient(#d0d0d0, 1px, #eeeeee 0);
  background-size: 30px 30px;
}

</style>
