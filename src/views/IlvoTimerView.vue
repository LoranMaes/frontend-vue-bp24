<script setup lang="ts">
import { onMounted, ref } from "vue";

const category = ref<string>("");

onMounted(() => {
  // Get category from localstorage
  const categoryFromLocalStorage = localStorage.getItem("newTimerCategory");
  if (categoryFromLocalStorage) {
    category.value = categoryFromLocalStorage;
  }
});
</script>

<template>
  <!-- Show right header depending if a category from new timer is already in localstorage -->
</template>

<style lang="scss"></style>
