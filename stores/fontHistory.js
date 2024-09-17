import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { fontNameToExternalShowcaseURL } from "../helpers/helpers";

export const useFontHistoryStore = defineStore("fontHistory", {
  state: () => ({
    history: useStorage("fontHistory/history", [])
  }),
  actions: {
    addToHistory(fontName, fontURL) {
      this.$state.history.push({ name: fontName, stylesheetURL: fontURL, externalShowcaseURL: fontNameToExternalShowcaseURL(fontName) });
    },
  },
});
