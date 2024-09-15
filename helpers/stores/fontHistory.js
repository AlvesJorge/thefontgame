import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { fontNameToExternalShowcaseURL } from "../helpers";

export const useFontHistoryStore = defineStore("fontHistory", {
  state: () => ({
    history: []
  }),
  actions: {
    addToHistory(fontName, fontURL) {
      this.$state.history.push({ name: fontName, stylesheetURL: fontURL, externalShowcaseURL: fontNameToExternalShowcaseURL(fontName) });
    },
  },
  hydrate(state) {
    state.history = useStorage("fontHistory/history", []);
  }

});
