import { defineStore } from "pinia";
import { ref } from "vue";

export const useTimerStore = defineStore("timer", () => {
  const timer = ref<number>(0);
  const isRunning = ref<boolean>(false);
  const localCategory = ref<{ id: string; sub_cat_id?: string } | null>(null);
  const currentTask = ref<string | null>(null);

  const startTimer = () => {
    isRunning.value = true;
    const startTime = Date.now();
    const interval = setInterval(() => {
      timer.value = Date.now() - startTime;
    }, 1000);
    return interval;
  };

  const stopTimer = (interval: number) => {
    isRunning.value = false;
    clearInterval(interval);
  };

  return {
    timer,
    isRunning,
    startTimer,
    stopTimer,
    localCategory,
    currentTask,
  };
});
