<template>
  <div>
    <MainNav />
    <main id="main">
      <FontsTable
        id="fontsTable"
        :fonts="useFontHistoryStore().history.toReversed()"
      />
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
