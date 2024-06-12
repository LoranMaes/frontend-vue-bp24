import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { apiAxios } from "../axios/apiAxios";

export const useTimerStore = defineStore("timer", () => {
  let localStartTime = localStorage.getItem("timer");
  let localStartDateTime = localStorage.getItem("timer_start");
  let localEndDateTime = localStorage.getItem("timer_end");
  const checkLocalValues = () => {
    // Check if any local value is filled in and the rest not, clear everything
    if (!localStartTime || !localStartDateTime || !localEndDateTime) {
      localStorage.removeItem("timer");
      localStorage.removeItem("timer_start");
      localStorage.removeItem("timer_end");

      localStartDateTime = null;
      localEndDateTime = null;
      localStartTime = null;
    }
  };

  const timer = ref<number>(localStartTime ? parseInt(localStartTime) : 0);
  const startTime = ref(
    localStartDateTime ? new Date(parseInt(localStartDateTime)) : new Date()
  );
  const endTime = ref(
    localEndDateTime ? new Date(parseInt(localEndDateTime)) : new Date()
  );

  const isRunning = ref<boolean>(false);
  const localCategory = ref<{ id: string; sub_cat_id?: string } | null>(null);

  const formattedTimer = computed(() => {
    const hours = Math.floor(timer.value / 3600);
    const minutes = Math.floor(
      hours ? (timer.value % 3600) / 60 : timer.value / 60
    );
    const seconds = hours ? (timer.value % 3600) % 60 : timer.value % 60;
    return hours >= 24
      ? "More than 1 day"
      : `${hours ? hours.toString().padStart(2, "0") + ":" : ""}${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  });

  let intervalId: number | null = null;

  const startTimer = () => {
    isRunning.value = true;
    const start_time = localStartTime ? parseInt(localStartTime) : Date.now();
    startTime.value = new Date(start_time);
    !localStartDateTime
      ? localStorage.setItem("timer_start", Date.now().toString())
      : null;

    intervalId = window.setInterval(() => {
      timer.value = Math.floor((Date.now() - start_time) / 1000);
      localStorage.setItem("timer", timer.value.toString());
      endTime.value = new Date();
    }, 1000);
  };

  const stopTimer = () => {
    isRunning.value = false;
    endTime.value = new Date();
    !localEndDateTime
      ? localStorage.setItem("timer_end", Date.now().toString())
      : null;
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  const toggleTimer = () => {
    if (isRunning.value) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const sendTimer = async (formData: FormData): Promise<boolean> => {
    try {
      const resp = await apiAxios.post("/tasks", formData);
      if (resp.status !== 200) return false;
      localStorage.removeItem("timer");
      localStorage.removeItem("timer_start");
      localStorage.removeItem("timer_end");
      localStorage.removeItem("newTimerCategory");
      timer.value = 0;
      startTime.value = new Date();
      endTime.value = new Date();
      isRunning.value = false;
      return true;
    } catch (error: any) {
      throw new Error("Invalid form data");
    }
  };

  return {
    timer,
    isRunning,
    startTimer,
    stopTimer,
    localCategory,
    toggleTimer,
    formattedTimer,
    startTime,
    endTime,
    checkLocalValues,
    sendTimer,
  };
});
