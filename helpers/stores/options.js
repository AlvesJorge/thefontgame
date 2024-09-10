import { defineStore } from "pinia";
export const useOptionsStore = defineStore("options", {
  state: () => ({ numberOfAnswerOptions: 3 }),
});
