<script setup lang="ts">
import { defineEmits } from "vue";
import { Category } from "../../models/category.model";
import { mdiChevronRight } from "@mdi/js";

defineEmits(["categorySelected"]);

const props = defineProps<{
  category: {
    id: string;
    title: string;
    sub_categories: Category[];
  };
}>();
</script>

<template>
  <button
    class="category_picker"
    @click="$emit('categorySelected', { id: category.id })"
  >
    <!-- TODO: add images -->
    <!-- <img src="" alt=""> -->
    <p class="bold">{{ category.title }}</p>
    <svg viewBox="0 0 24 24" height="24" width="24">
      <path :d="mdiChevronRight"></path>
    </svg>
  </button>
  <button
    @click="
      $emit('categorySelected', { sub_cat_id: sub_cat.id, id: category.id })
    "
    v-if="category.sub_categories && category.sub_categories.length"
    v-for="sub_cat in category.sub_categories"
    :key="sub_cat.id"
    class="category_picker sub"
  >
    <p class="bold">{{ sub_cat.title }}</p>
    <p class="small bold sub_cat_title">{{ category.title }}</p>
    <svg viewBox="0 0 24 24" height="24" width="24">
      <path :d="mdiChevronRight"></path>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
button {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-items: flex-start;
  width: 100%;
  border: 1px solid var(--gray-3);
  border-radius: 0.8rem;
  padding: 1.6rem 2.4rem;
  gap: 0.4rem;
  box-shadow: var(--shadow-sm);
  background-color: var(--primary-white);
  p {
    margin: 0;
  }
  &.category_picker {
    &.sub {
    }
  }
  svg {
    fill: var(--gray-3);
    position: absolute;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .sub_cat_title {
    color: var(--state-warning);
  }
}
</style>
