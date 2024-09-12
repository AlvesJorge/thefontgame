import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useFontHistoryStore = defineStore("fontHistory", {
  state: () => ({
    history: []
  }),
  actions: {
    addToHistory(fontName, fontURL) {
      console.log(this.$state.history);
      this.$state.history.push([fontName, fontURL]);
    },
  },
  hydrate(state) {
    state.history = useStorage("fontHistory/history", []);
  }

});
