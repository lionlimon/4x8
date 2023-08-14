import {defineStore} from "pinia";
import {toRefs, reactive} from "vue";

export const useCalendarStore = defineStore('calendar', () => {
  const state = reactive({
    currentMonth: new Date().toISOString().slice(0,7)
  });

  const setMonth = (date: string) => state.currentMonth = date;

  return {
    ...toRefs(state),
    setMonth
  }
});
