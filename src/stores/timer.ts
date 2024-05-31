import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("timer", () => {
  const timer = ref<number>(0);
  const isRunning = ref<boolean>(false);

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

  return { timer, isRunning, startTimer, stopTimer };
});
