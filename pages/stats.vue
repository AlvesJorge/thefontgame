<script setup>

const historyStore = useFontHistoryStore();
function getFontsSeenCount() {
};
const fontsSeenCount = ref();
</script>
<template>
  <div>
    <MainNav />
    <main id="main">
      a
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
