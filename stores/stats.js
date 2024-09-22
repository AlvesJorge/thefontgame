import { useStorage } from "@vueuse/core";

export const useStatsStore = defineStore("stats", {
  state: () => ({
    bestRoundsGame: useStorage("fontHistory/bestRoundsGame", [0, 15]),
    bestTimedGame: useStorage("fontHistory/bestTimedGame", [0, 30]),
    totalAnswered: useStorage("fontHistory/totalAnswered", 0),
  }),
  actions: {
    updateBestRoundsGame(correctCount, totalCount) {
      this.$state.bestRoundsGame = [correctCount, totalCount];
    },
    updateBestTimedGame(correctCount, totalCount) {
      this.$state.bestTimedGame = [correctCount, totalCount];
    },
    incrementTotalAnswered() {
      this.$state.totalAnswered += 1;
    },
  },
});
