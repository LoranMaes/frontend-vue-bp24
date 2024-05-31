<script setup lang="ts">
import { onMounted, ref } from "vue";
import IlvoCategoryPicker from "../components/organisms/IlvoCategoryPicker.vue";

const category = ref({});

onMounted(() => {
  // Get category from local storage
  const categoryFromLocalStorage = localStorage.getItem("newTimerCategory");
  if (categoryFromLocalStorage) {
    category.value = categoryFromLocalStorage;
  }
});
</script>

<template>
  <!-- Show right header depending if a category from new timer is already in localstorage -->
  <div v-if="Object.keys(category).length" class="timer-input-form">
    <h1>Timer</h1>
    <p>Category: {{ category }}</p>
  </div>
  <template v-else>
    <div class="top-categories">
      <h2>{{ $t("timer.first_step.sub_title") }}</h2>
      <p>{{ $t("development") }}</p>
    </div>
    <div class="other-categories">
      <h2>{{ $t("timer.first_step.other") }}</h2>
      <IlvoCategoryPicker
        type="other"
        @category-selected="(e) => (category = e)"
      />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.top-categories,
.other-categories {
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
