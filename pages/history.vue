<template>
  <MainNav />
  <main id="main">
    <HistoryTable id="historyTable" />
  </main>
</template>
<style scoped>
#main{
  display:grid;
  place-content:center;
  height:90%;
}
#historyTable{
  max-width:1000px;
  min-width:500px;
}
</style>
