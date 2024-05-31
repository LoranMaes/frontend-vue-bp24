<script setup lang="ts">
import { onMounted } from "vue";
import IlvoCategoryPicker from "../components/organisms/IlvoCategoryPicker.vue";
import IlvoTimer from "../components/molecules/IlvoTimer.vue";
import IlvoTimerForm from "../components/organisms/IlvoTimerForm.vue";

import { useTimerStore } from "../stores/timer";

const timer_store = useTimerStore();

onMounted(() => {
  // If there is a category in local storage use it and put it in the store
  const categoryFromLocalStorage = localStorage.getItem("newTimerCategory");
  if (categoryFromLocalStorage) {
    timer_store.localCategory = JSON.parse(categoryFromLocalStorage);
  }
});
</script>

<template>
  <!-- Show right header depending if a category from new timer is already in localstorage -->
  <div
    v-if="
      timer_store.localCategory && Object.keys(timer_store.localCategory).length
    "
    class="timer-input-form"
  >
    <IlvoTimer v-if="!timer_store.timer || timer_store.isRunning" />
    <IlvoTimerForm />
  </div>
  <template v-else>
    <div class="top-categories">
      <h2>{{ $t("timer.first_step.sub_title") }}</h2>
      <p>{{ $t("development") }}</p>
    </div>
    <div class="other-categories">
      <h2>{{ $t("timer.first_step.other") }}</h2>
      <IlvoCategoryPicker type="other" />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.top-categories,
.other-categories,
.timer-input-form {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  h2 {
    margin: 0;
  }
}
.other-categories {
  padding-top: 0;
}
</style>
