<script setup lang="ts">
import { Task } from "../../models/task.model";
import { defineProps } from "vue";

defineProps<{
  task: Task;
}>();
</script>

<template>
  <div class="card">
    <div class="card-header">
      <p class="bold">{{ task.title }}</p>
      <p>{{ task.start }} {{ task.end }}</p>
    </div>
    <div class="card-sub-header">
      <p class="small bold"></p>
      <p class="small bold" v-if="task.subCategoryId"></p>
    </div>
    <div class="card-description" v-if="task.description">
      <p>{{ task.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>