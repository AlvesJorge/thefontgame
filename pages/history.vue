<script setup>
function clearFontHistory() {
  useFontHistoryStore().history = [];
  window.location.reload();
}
</script>
<template>
  <div>
    <MainNav />
    <main id="main">
      <FontsTable
        id="fontsTable"
        :fonts="useFontHistoryStore().history.toReversed()"
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
  height:90%;
}
#fontsTable{
  max-width:1000px;
  min-width:500px;
}
</style>
