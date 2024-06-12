<script setup lang="ts">
import { computed } from "vue";
import { Task } from "../../models/task.model";
import { useUserStore } from "../../stores/user";
import { Helpers } from "../../composables/helpers";

const props = defineProps<{
  task: Task;
}>();

const user_store = useUserStore();

const cat_title = computed(() => {
  return user_store.categories?.find((cat) => cat.id === props.task.categoryId)
    ?.title;
});

const sub_cat_title = computed(() => {
  user_store.categories?.forEach((cat) => {
    return cat.sub_categories?.find(
      (sub_cat) => sub_cat.id === props.task.subCategoryId
    )?.title;
  });
});
</script>

<template>
  <div
    :style="{
      backgroundColor: task.color ? task.color : '#dfefd7',
      boxShadow: '0 0 0.8rem ' + task.color,
    }"
    :class="[
      'card',
      Helpers.getContrastingColor(task.color ? task.color : '#dfefd7'),
    ]"
  >
    <div class="card-header">
      <p class="bold">{{ task.title }}</p>
      <div class="times">
        <p>
          {{ new Date(task.start).getHours().toString().padStart(2, "0") }}:{{
            new Date(task.start).getMinutes().toString().padStart(2, "0")
          }}
          - {{ new Date(task.end).getHours().toString().padStart(2, "0") }}:{{
            new Date(task.end).getMinutes().toString().padStart(2, "0")
          }}
        </p>
      </div>
    </div>
    <div class="categories">
      <p class="small bold">
        {{ cat_title }}
      </p>
      <p class="small bold" v-if="task.subCategoryId">
        {{ sub_cat_title }}
      </p>
    </div>
    <p class="small">{{ task.description }}</p>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  &.dark * {
    color: var(--primary-white) !important;
  }
  &.light * {
    color: var(--primary-dark) !important;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    gap: 0.8rem;
  }
  .categories {
    display: flex;
    gap: 0.8rem;
    p {
      &:last-child {
        position: relative;
        ::before {
          content: "";
          position: absolute;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          background-color: var(--primary-black);
          left: -0.8rem;
        }
      }
    }
  }
}
</style>
