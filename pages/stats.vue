<script setup>

import allFontNames from "~/assets/fonts.json";
const fontNames = allFontNames["fonts"];
const historyStore = useFontHistoryStore();
const statsStore = useStatsStore();
const seenFonts = new Set(historyStore.history);
function clearData() {
  window.localStorage.clear();
  window.location.reload();
}
</script>
<template>
  <div>
    <MainNav />
    <main id="main">
      <h1>Your Stats</h1>
      <Table
        id="statsTable"
        class="w-full"
      >
        <TableBody>
          <TableRow>
            <TableCell>
              Total Answered: <b>{{ statsStore.totalAnswered }}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Fonts Seen: <b>{{ seenFonts.size }} ({{ (seenFonts.size / fontNames.length * 100).toFixed(2) }}%)</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Fonts Not Yet Seen: <b>{{ fontNames.length - seenFonts.size }}</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Best score in Rounds: <b>{{ statsStore.bestRoundsGame[0] }} correct in {{ statsStore.bestRoundsGame[1] }} rounds</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Best score in Timed: <b>{{ statsStore.bestTimedGame[0] }} correct in {{ statsStore.bestTimedGame[1] }} seconds</b>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody />
      </Table>
      <Card>
        <CardHeader>
          <CardTitle>About this data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>All this data is stored in your browser.</p>
          <p>Although the space it uses is negligible, you may delete it by using the button below</p>
          <br>
          <Button @click="()=> clearData()">
            Reset Stats and Options
          </Button>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
<style scoped>
#main{
  display:grid;
  place-content:center;
  height:90%;
  width: 80%;

  margin:0 auto;
  padding:2rem;
  gap:2rem;
}
#statsTable{
  font-size:5rem !important;
  border-radius:1rem;
  border:2px solid hsl(var(--border));
  width:100%;
}
#statsTable * {
  font-size:1.2rem;
}
h1{
  font-size:3rem;
}

@media only screen and (max-width: 800px) {
  #main {
    padding: 1rem;
    gap: 1rem;
    width:95%
  }
}
</style>
