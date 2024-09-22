<script setup>
function clearFontHistory() {
  useFontHistoryStore().history = [];
  window.location.reload();
}
function fontNamesToFontInstances(fontNames) {
  return fontNames.map((name) => new Font(name));
}
</script>
<template>
  <div>
    <MainNav />
    <main id="main">
      <FontsTable
        id="fontsTable"
        :fonts="fontNamesToFontInstances(useFontHistoryStore().history.toReversed())"
      />

      <Button
        class="w-fit mt-4"
        @click="clearFontHistory"
      >
        Clear History
      </Button>
    </main>
  </div>
</template>
<style scoped>
#main{
  display:grid;
  place-content:center;
  margin-top:2rem;
}
#fontsTable{
  max-width:1000px;
  min-width:500px;
}
</style>
