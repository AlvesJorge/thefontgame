import { useStorage } from "@vueuse/core";

export const useFontHistoryStore = defineStore("fontHistory", {
  state: () => ({
    history: useStorage("fontHistory/history", [])
  }),
  actions: {
    addToHistory(fontName) {
      this.$state.history.push(fontName);
    },
  },
});
